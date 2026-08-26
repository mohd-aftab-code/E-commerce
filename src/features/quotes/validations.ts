import { z } from "zod";

export const quoteItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  targetPrice: z.number().int().optional().nullable(),
});

export const submitQuoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  notes: z.string().optional(),
  items: z.array(quoteItemSchema).min(1, "At least one item is required for a quote"),
});

export const updateQuoteStatusSchema = z.object({
  id: z.string(),
  status: z.enum(["PENDING", "REVIEWING", "QUOTED", "ACCEPTED", "REJECTED"]),
  totalAmount: z.number().int().optional().nullable(),
});

export type SubmitQuoteInput = z.infer<typeof submitQuoteSchema>;
export type UpdateQuoteStatusInput = z.infer<typeof updateQuoteStatusSchema>;
