import { z } from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  company: z.string().max(100).optional(),
  addressLine1: z.string().min(1, "Street address is required").max(100),
  addressLine2: z.string().max(100).optional(),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().length(2, "State must be a 2-letter abbreviation"),
  zipCode: z.string().min(5, "ZIP code is required").max(10),
  country: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
