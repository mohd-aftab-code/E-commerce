/**
 * General utility functions.
 *
 * Keep this file focused on pure, side-effect-free helpers.
 * Feature-specific utilities belong in their feature directory.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AmountInCents } from "@/types";
import { CURRENCY, LOCALE } from "./constants";

// ---------------------------------------------------------------------------
// className merging
// ---------------------------------------------------------------------------

/**
 * Merge Tailwind CSS class names, resolving conflicts correctly.
 * Use this instead of a plain template literal when merging conditional classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------------------------
// Currency formatting
// ---------------------------------------------------------------------------

/**
 * Format an amount in cents as a USD currency string.
 *
 * @example formatPrice(1999) → "$19.99"
 * @example formatPrice(0) → "$0.00"
 */
export function formatPrice(
  amountInCents: AmountInCents,
  options?: Intl.NumberFormatOptions
): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
}

/**
 * Convert a dollar amount (float) to integer cents.
 * Use this when receiving values from Stripe or user input.
 *
 * @example toCents(19.99) → 1999
 */
export function toCents(dollars: number): AmountInCents {
  return Math.round(dollars * 100);
}

/**
 * Convert cents to dollars.
 *
 * @example fromCents(1999) → 19.99
 */
export function fromCents(cents: AmountInCents): number {
  return cents / 100;
}

// ---------------------------------------------------------------------------
// Slugs
// ---------------------------------------------------------------------------

/**
 * Convert a string into a URL-safe slug.
 *
 * @example slugify("Business Cards - Full Color") → "business-cards-full-color"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// Dates
// ---------------------------------------------------------------------------

/**
 * Format a date for display in US format.
 *
 * @example formatDate(new Date()) → "Aug 24, 2026"
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(LOCALE, {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(typeof date === "string" ? new Date(date) : date);
}

// ---------------------------------------------------------------------------
// Phone formatting
// ---------------------------------------------------------------------------

/**
 * Format a US phone number string for display.
 * Accepts 10-digit strings or strings with common separators.
 *
 * @example formatUsPhone("8135551234") → "(813) 555-1234"
 */
export function formatUsPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export function getPaginationOffset(page: number, pageSize: number): number {
  return (Math.max(1, page) - 1) * pageSize;
}

export function buildPaginationMeta(
  page: number,
  pageSize: number,
  total: number
) {
  const totalPages = Math.ceil(total / pageSize);
  return {
    page,
    pageSize,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

// ---------------------------------------------------------------------------
// String helpers
// ---------------------------------------------------------------------------

/**
 * Truncate a string to a maximum length, adding an ellipsis if truncated.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…";
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
