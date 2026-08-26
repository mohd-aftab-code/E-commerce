"use server";

import { db } from "@/lib/prisma";
import { z } from "zod";

const trackOrderSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  email: z.string().email("Invalid email address"),
});

export type TrackOrderState = {
  status?: string;
  orderData?: {
    id: string;
    status: string;
    totalAmount: number;
    createdAt: Date;
    itemsCount: number;
  };
  error?: string;
  fieldErrors?: {
    orderId?: string[];
    email?: string[];
  };
};

export async function trackOrder(
  prevState: TrackOrderState,
  formData: FormData
): Promise<TrackOrderState> {
  try {
    const rawData = {
      orderId: formData.get("orderId"),
      email: formData.get("email"),
    };

    const validatedData = trackOrderSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        fieldErrors: validatedData.error.flatten().fieldErrors,
      };
    }

    const { orderId, email } = validatedData.data;

    // Remove any prefixes users might type like "PS24-" if we just store CUIDs, 
    // or keep it if we use formatted IDs. Currently, Prisma uses CUIDs by default for ID.
    // Let's assume orderId is the raw database ID for this phase.
    const cleanOrderId = orderId.replace(/^PS24-/i, "").trim();

    const order = await db.order.findUnique({
      where: { id: cleanOrderId },
      include: {
        items: true,
      },
    });

    if (!order) {
      return { error: "Order not found. Please check your Order ID." };
    }

    // Verify email
    let orderEmail = order.guestEmail;
    if (order.userId && !orderEmail) {
      const user = await db.user.findUnique({
        where: { id: order.userId },
        select: { email: true }
      });
      if (user?.email) {
        orderEmail = user.email;
      }
    }
    
    if (!orderEmail || orderEmail.toLowerCase() !== email.toLowerCase()) {
      return { error: "Email address does not match the order." };
    }

    return {
      status: "success",
      orderData: {
        id: order.id,
        status: order.status,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        itemsCount: order.items.length,
      },
    };
  } catch (error) {
    console.error("Error tracking order:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
