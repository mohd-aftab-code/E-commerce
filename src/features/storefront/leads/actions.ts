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

    const validatedData = leadSchema.parse(rawData);

    await db.lead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        message: validatedData.message,
      },
    });

    return { success: true, message: "Thank you! Your query has been submitted successfully." };
  } catch (error: any) {
    console.error("Failed to submit lead:", error);
    
    if (error.name === "ZodError") {
      return { 
        success: false, 
        message: "Please check the form for errors.", 
        errors: error.errors 
      };
    }
    
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}
