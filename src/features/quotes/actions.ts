"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { submitQuoteSchema, updateQuoteStatusSchema, SubmitQuoteInput, UpdateQuoteStatusInput } from "./validations";

export async function submitQuoteAction(data: SubmitQuoteInput) {
  try {
    const parsed = submitQuoteSchema.parse(data);

    const quote = await db.quote.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        company: parsed.company || null,
        phone: parsed.phone,
        notes: parsed.notes || null,
        items: {
          create: parsed.items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            targetPrice: item.targetPrice || null,
          })),
        },
      },
    });

    return { success: true, quoteId: quote.id };
  } catch (error: any) {
    console.error("Failed to submit quote:", error);
    return { success: false, error: error.message || "Failed to submit quote." };
  }
}

export async function updateQuoteStatusAction(data: UpdateQuoteStatusInput) {
  try {
    const parsed = updateQuoteStatusSchema.parse(data);

    await db.quote.update({
      where: { id: parsed.id },
      data: {
        status: parsed.status,
        totalAmount: parsed.totalAmount !== undefined ? parsed.totalAmount : undefined,
      },
    });

    revalidatePath("/admin/quotes");
    revalidatePath(`/admin/quotes/${parsed.id}`);
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update quote status:", error);
    return { success: false, error: error.message || "Failed to update quote." };
  }
}
