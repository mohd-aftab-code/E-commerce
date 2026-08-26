import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getOrCreateCart } from "@/features/storefront/cart/actions";
import { db } from "@/lib/prisma";
import { siteConfig } from "@/config/site";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const addressId = searchParams.get("addressId");
  try {
    const cart = await getOrCreateCart();

    if (cart.items.length === 0) {
      return NextResponse.redirect(new URL("/cart", siteConfig.url));
    }

    // Prepare line items for Stripe
    const line_items = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          description: `Qty: ${item.quantity}`,
          images: item.product.imageUrl ? [item.product.imageUrl] : [],
        },
        unit_amount: Math.round(item.price), // Assuming price is already in cents for total quantity, wait...
        // Stripe expects unit_amount to be the price PER item in the line_item.
        // But our `item.price` is the snapshot of the TOTAL for that quantity block.
        // So in Stripe, quantity should be 1, and unit_amount should be the total block price.
      },
      quantity: 1,
    }));

    // Calculate total amount in cents
    const totalAmount = cart.items.reduce((sum, item) => sum + item.price, 0);

    // Fetch selected address if any
    let selectedAddress = null;
    if (addressId && cart.userId) {
      selectedAddress = await db.address.findUnique({
        where: { id: addressId, userId: cart.userId }
      });
    }

    // Create a new Order in DB marked as PENDING_PAYMENT
    const order = await db.order.create({
      data: {
        userId: cart.userId, // Will be null if guest
        totalAmount,
        status: "PENDING_PAYMENT",
        shippingName: selectedAddress ? `${selectedAddress.firstName} ${selectedAddress.lastName}` : null,
        shippingAddress: selectedAddress ? `${selectedAddress.addressLine1} ${selectedAddress.addressLine2 || ''}`.trim() : null,
        shippingCity: selectedAddress ? selectedAddress.city : null,
        shippingState: selectedAddress ? selectedAddress.state : null,
        shippingZip: selectedAddress ? selectedAddress.zipCode : null,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            options: item.options || {},
            artworkUrl: item.artworkUrl
          }))
        }
      }
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "required",
      ...(selectedAddress ? {} : {
        shipping_address_collection: {
          allowed_countries: ["US"],
        }
      }),
      line_items,
      success_url: `${siteConfig.url}/cart?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.url}/cart?canceled=true`,
      metadata: {
        orderId: order.id,
        cartId: cart.id, // We will empty this cart upon successful payment
      },
    });

    // Save the Stripe Session ID to the order
    await db.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    if (!session.url) {
      throw new Error("Stripe session URL is missing");
    }

    // Redirect to Stripe Hosted Checkout
    return NextResponse.redirect(session.url);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Stripe Checkout Error:", err.message);
    // Redirect back to cart with error
    return NextResponse.redirect(new URL("/cart?error=checkout_failed", siteConfig.url || "http://localhost:3000"));
  }
}
