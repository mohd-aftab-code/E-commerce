/**
 * Stripe client singleton.
 *
 * SERVER-ONLY. Never import this from client components.
 * Use `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` on the client side.
 *
 * Security rule: STRIPE_SECRET_KEY must never be exposed to the browser.
 */

import "server-only";

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY environment variable. " +
      "Add it to your .env file. Never commit this value."
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Pin the API version for stability — update intentionally when upgrading Stripe.
  // Matches Stripe npm package 22.5.0
  apiVersion: "2026-07-29.dahlia",
  typescript: true,
});
