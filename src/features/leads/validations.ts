import { z } from "zod";
import { emailSchema, usAddressSchema } from "@/validations";

export const leadCaptureSchema = z.object({
  email: emailSchema,
  source: z.string().optional().default("EXIT_INTENT_POPUP"),
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;


