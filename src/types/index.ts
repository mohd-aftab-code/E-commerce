/**
 * Shared TypeScript types and interfaces.
 *
 * This file exports foundational types that are used across multiple
 * features. Feature-specific types should live inside their respective
 * feature directory (e.g. `src/features/products/types.ts`).
 */

import type { CURRENCY, LOCALE } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Utility types
// ---------------------------------------------------------------------------

/** Make specific keys required */
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make specific keys optional */
export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/** Pagination metadata returned from list endpoints */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/** Standard paginated response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Standard API success response */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

/** Standard API error response */
export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, string[]>;
}

/** Union of API responses */
export type ApiResponse<T = unknown> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;

// ---------------------------------------------------------------------------
// Money / currency
// ---------------------------------------------------------------------------

/** Monetary value in cents (integer) to avoid floating-point issues */
export type AmountInCents = number;

/** Human-readable price display */
export interface Price {
  /** Amount in cents, e.g. 1999 = $19.99 */
  amount: AmountInCents;
  currency: typeof CURRENCY;
}

// ---------------------------------------------------------------------------
// US Address
// ---------------------------------------------------------------------------

export interface UsAddress {
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string; // 2-letter US state code, e.g. "FL"
  zipCode: string; // 5 or 9 digit US ZIP, e.g. "33602" or "33602-1234"
  country: "US";
}

// ---------------------------------------------------------------------------
// SEO / Metadata helpers
// ---------------------------------------------------------------------------

export interface PageSeoProps {
  title: string;
  description: string;
  canonicalPath: string;
  noIndex?: boolean;
  openGraphImage?: string;
}

// ---------------------------------------------------------------------------
// Server Action result type
// Used to return typed results from Next.js Server Actions.
// ---------------------------------------------------------------------------

export type ActionResult<T = void> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

// ---------------------------------------------------------------------------
// File upload
// ---------------------------------------------------------------------------

export interface UploadedFile {
  /** Unique storage key / object key */
  key: string;
  /** Original filename from client */
  originalName: string;
  /** MIME type */
  mimeType: string;
  /** File size in bytes */
  sizeBytes: number;
  /** Publicly accessible URL (presigned or CDN) */
  url: string;
}

// ---------------------------------------------------------------------------
// Locale
// ---------------------------------------------------------------------------

export type SupportedLocale = typeof LOCALE;
export type SupportedCurrency = typeof CURRENCY;
