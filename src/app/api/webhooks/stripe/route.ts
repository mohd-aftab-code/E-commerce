import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prisma";
import Stripe from "stripe";
import { sendOrderConfirmationEmail, sendPaymentFailedEmail } from "@/lib/email";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!webhookSecret) {
      throw new Error("Missing STRIPE_WEBHOOK_SECRET");
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;

    if (!orderId) {
      console.error("No orderId in session metadata");
      return new NextResponse("Webhook Error: Missing orderId", { status: 400 });
    }

    try {
      // 1. Update Order Status and save Payment Details
      await db.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          stripePaymentId: session.payment_intent as string,
          shippingName: session.customer_details?.name,
          shippingAddress: session.customer_details?.address?.line1 + 
            (session.customer_details?.address?.line2 ? `, ${session.customer_details.address.line2}` : ""),
          shippingCity: session.customer_details?.address?.city,
          shippingState: session.customer_details?.address?.state,
          shippingZip: session.customer_details?.address?.postal_code,
        },
      });

      // 2. Empty the User's Cart
      if (cartId) {
        await db.cartItem.deleteMany({
          where: { cartId: cartId }
        });
      }

      console.log(`Payment successful for Order: ${orderId}`);

      // 3. Send Order Confirmation Email
      if (session.customer_details?.email) {
        await sendOrderConfirmationEmail(
          session.customer_details.email, 
          orderId, 
          session.amount_total || 0
        ).catch(e => console.error("Failed to send confirmation email:", e));
      }
    } catch (dbError) {
      console.error("Database error while fulfilling order:", dbError);
      return new NextResponse("Webhook Error: DB update failed", { status: 500 });
    }
  } else if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const errorMessage = paymentIntent.last_payment_error?.message || "Unknown error";
    console.error(`Payment failed: ${errorMessage}`);
    
    await sendPaymentFailedEmail(
      process.env.ADMIN_EMAIL || "admin@printstudio24.com", 
      paymentIntent.metadata?.orderId || "UNKNOWN", 
      errorMessage
    ).catch(e => console.error("Failed to send failure email:", e));
  }

  return new NextResponse("Webhook processed successfully", { status: 200 });
}
