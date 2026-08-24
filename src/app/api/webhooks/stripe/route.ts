/**
 * Stripe webhook handler.
 *
 * POST /api/webhooks/stripe
 *
 * SECURITY:
 *  - Raw body is required for signature verification — DO NOT use bodyParser.
 *  - All events must be verified with stripe.webhooks.constructEvent().
 *  - Never trust event data without verification.
 *
 * This is a stub — event handlers will be implemented in Phase: Payments.
 */

import "server-only";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export const runtime = "nodejs";

// Raw body required for Stripe signature verification
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // Lazy-import stripe to avoid initializing in edge/non-server contexts
    const { stripe } = await import("@/lib/stripe");
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    console.error("[Stripe Webhook] Signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------------------
  // Event routing (stubs — implement in Phase: Payments)
  // ---------------------------------------------------------------------------
  switch (event.type) {
    case "payment_intent.succeeded":
      // TODO: Handle payment success — fulfill order
      break;

    case "payment_intent.payment_failed":
      // TODO: Handle payment failure — notify customer
      break;

    case "charge.refunded":
      // TODO: Handle refund — update order status
      break;

    default:
      // Unknown events are safely ignored
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
