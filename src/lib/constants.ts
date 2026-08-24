/**
 * Application-wide constants.
 *
 * Enums, magic numbers, and string constants that are referenced across
 * multiple modules. Business logic should import from here rather than
 * duplicating literals.
 */

// ---------------------------------------------------------------------------
// Order & Artwork status constants
// (Mirror the Prisma enums defined in prisma/schema.prisma)
// ---------------------------------------------------------------------------

export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  IN_PRODUCTION: "IN_PRODUCTION",
  READY_FOR_PICKUP: "READY_FOR_PICKUP",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ARTWORK_STATUS = {
  PENDING_REVIEW: "PENDING_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  REVISION_REQUESTED: "REVISION_REQUESTED",
  ARCHIVED: "ARCHIVED",
} as const;

export type ArtworkStatus =
  (typeof ARTWORK_STATUS)[keyof typeof ARTWORK_STATUS];

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SUCCEEDED: "SUCCEEDED",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
  PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
} as const;

export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const QUOTE_STATUS = {
  DRAFT: "DRAFT",
  SENT: "SENT",
  VIEWED: "VIEWED",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  EXPIRED: "EXPIRED",
  CONVERTED: "CONVERTED",
} as const;

export type QuoteStatus = (typeof QUOTE_STATUS)[keyof typeof QUOTE_STATUS];

// ---------------------------------------------------------------------------
// User roles
// ---------------------------------------------------------------------------

export const USER_ROLE = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  STAFF: "STAFF",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

// ---------------------------------------------------------------------------
// Artwork file validation
// ---------------------------------------------------------------------------

/** Accepted MIME types for artwork uploads */
export const ACCEPTED_ARTWORK_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/svg+xml",
  "application/postscript", // .ai / .eps
  "application/illustrator",
] as const;

/** Maximum artwork file size: 200 MB */
export const MAX_ARTWORK_FILE_SIZE_BYTES = 200 * 1024 * 1024;

/** Minimum resolution for print-quality images (DPI) */
export const MIN_PRINT_DPI = 300;

// ---------------------------------------------------------------------------
// Pagination defaults
// ---------------------------------------------------------------------------

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ---------------------------------------------------------------------------
// Cart
// ---------------------------------------------------------------------------

export const MAX_CART_ITEM_QUANTITY = 10_000;

// ---------------------------------------------------------------------------
// Currency / locale
// ---------------------------------------------------------------------------

export const CURRENCY = "USD";
export const LOCALE = "en-US";

// ---------------------------------------------------------------------------
// US States
// Used for address form selects.
// ---------------------------------------------------------------------------

export const US_STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
  { label: "District of Columbia", value: "DC" },
] as const;

export type UsStateCode = (typeof US_STATES)[number]["value"];
