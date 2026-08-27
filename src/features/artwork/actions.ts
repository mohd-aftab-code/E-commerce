"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitArtwork(orderItemId: string, fileUrl: string, fileName: string) {
  if (!orderItemId || !fileUrl || !fileName) {
    throw new Error("Missing required fields");
  }

  // Create Artwork record
  await db.artwork.create({
    data: {
      orderItemId,
      fileUrl,
      fileName,
      status: "PENDING",
    },
  });

  // Update order item to show it has artwork attached
  await db.orderItem.update({
    where: { id: orderItemId },
    data: { artworkUrl: fileUrl },
  });

  revalidatePath("/account/orders");
}
