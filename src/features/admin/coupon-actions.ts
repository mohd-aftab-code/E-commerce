"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { stripe } from "@/lib/stripe";
import { DiscountType } from "@prisma/client";

export async function getCoupons() {
  return await db.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createCoupon(data: {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  usageLimit?: number | null;
}) {
  try {
    // 1. Create in Stripe first
    let stripeCoupon;
    if (data.discountType === "PERCENTAGE") {
      stripeCoupon = await stripe.coupons.create({
        percent_off: data.discountValue,
        duration: "once",
        id: data.code,
        max_redemptions: data.usageLimit || undefined,
      });
    } else {
      stripeCoupon = await stripe.coupons.create({
        amount_off: data.discountValue,
        currency: "usd",
        duration: "once",
        id: data.code,
        max_redemptions: data.usageLimit || undefined,
      });
    }

    // 2. Create in DB
    const newCoupon = await db.coupon.create({
      data: {
        code: data.code,
        discountType: data.discountType,
        discountValue: data.discountValue,
        usageLimit: data.usageLimit || null,
        isActive: true,
      },
    });

    revalidatePath("/admin/coupons");
    return { success: true, coupon: newCoupon };
  } catch (error: any) {
    console.error("Error creating coupon:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleCouponStatus(id: string, isActive: boolean) {
  try {
    const coupon = await db.coupon.findUnique({ where: { id } });
    if (!coupon) return { success: false, error: "Coupon not found" };
    
    await db.coupon.update({
      where: { id },
      data: { isActive },
    });

    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCoupon(id: string) {
  try {
    const coupon = await db.coupon.findUnique({ where: { id } });
    if (!coupon) return { success: false, error: "Coupon not found" };

    // Try deleting from Stripe
    try {
      await stripe.coupons.del(coupon.code);
    } catch (e) {
      console.error("Failed to delete stripe coupon, it might not exist", e);
    }

    await db.coupon.delete({ where: { id } });
    revalidatePath("/admin/coupons");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
