"use server";

import { db } from "@/lib/prisma";
import { leadSchema } from "./validations";
import { revalidatePath } from "next/cache";

export async function submitLead(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    const validatedFields = leadSchema.safeParse(rawData);

    if (!validatedFields.success) {
      const firstError = validatedFields.error?.issues?.[0]?.message;
      return {
        success: false,
        message: firstError || "Please check the form for errors.",
      };
    }

    await db.lead.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        phone: validatedFields.data.phone || null,
        message: validatedFields.data.message,
      },
    });

    return { success: true, message: "Thank you! Your query has been submitted successfully." };
  } catch (error: any) {
    console.error("Failed to submit lead:", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}
