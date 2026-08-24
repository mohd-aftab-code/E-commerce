"use server";

import { db } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { firstName: string; lastName: string; phone?: string }) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  try {
    await db.user.update({
      where: { id: session.userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      }
    });

    revalidatePath("/account/settings");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update profile" };
  }
}
