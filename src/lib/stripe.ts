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

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_demo";

export const stripe = new Stripe(stripeSecretKey, {
  // Pin the API version for stability — update intentionally when upgrading Stripe.
  // Matches Stripe npm package 22.5.0
  apiVersion: "2026-07-29.dahlia",
  typescript: true,
});
