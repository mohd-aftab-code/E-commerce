"use server";

import { db } from "@/lib/prisma";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    subject?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Extract data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Validate
    const validatedData = contactFormSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        fieldErrors: validatedData.error.flatten().fieldErrors,
      };
    }

    const { name, email, phone, subject, message } = validatedData.data;

    // Combine subject and message for the Lead table if needed, or just save
    const fullMessage = `Subject: ${subject}\n\n${message}`;

    // Save to Database
    await db.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        message: fullMessage,
        status: "NEW",
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
