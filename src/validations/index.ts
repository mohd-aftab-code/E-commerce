/**
 * Shared Zod validation schemas.
 *
 * This file exports foundational schemas reused across multiple features.
 * Feature-specific schemas belong in their respective feature directory
 * (e.g. `src/features/products/validations.ts`).
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

/** US ZIP code: 5-digit or ZIP+4 format */
export const usZipCodeSchema = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, "Enter a valid US ZIP code (e.g. 33602)");

/** US phone number — accepts common formats, normalizes to 10 digits */
export const usPhoneSchema = z
  .string()
  .regex(
    /^(\+1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    "Enter a valid US phone number"
  );

/** US 2-letter state code */
export const usStateSchema = z
  .string()
  .length(2, "State must be a 2-letter code")
  .toUpperCase();

/** Non-empty string trimmed */
export const nonEmptyString = z.string().trim().min(1, "This field is required");

/** Positive integer */
export const positiveInt = z.number().int().positive();

/** Amount in cents — must be a non-negative integer */
export const amountInCents = z.number().int().nonnegative();

// ---------------------------------------------------------------------------
// US Address
// ---------------------------------------------------------------------------

export const usAddressSchema = z.object({
  firstName: nonEmptyString.max(50),
  lastName: nonEmptyString.max(50),
  company: z.string().trim().max(100).optional(),
  addressLine1: nonEmptyString.max(100),
  addressLine2: z.string().trim().max(100).optional(),
  city: nonEmptyString.max(100),
  state: usStateSchema,
  zipCode: usZipCodeSchema,
  country: z.literal("US"),
});

export type UsAddressInput = z.infer<typeof usAddressSchema>;

// ---------------------------------------------------------------------------
// Pagination query params
// ---------------------------------------------------------------------------

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .max(254);

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password is too long") // bcrypt max effective length
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const registerSchema = z
  .object({
    firstName: nonEmptyString.max(50),
    lastName: nonEmptyString.max(50),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    phone: usPhoneSchema.optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
