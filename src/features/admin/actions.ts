"use server";

import { db } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import type { OrderStatus } from "@prisma/client";

// Ensure the caller is an admin
async function checkAdmin() {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "STAFF")) {
    throw new Error("Unauthorized");
  }
}

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------

export async function createCategory(data: { name: string; description?: string }) {
  await checkAdmin();
  try {
    const slug = slugify(data.name);
    await db.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
      },
    });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') return { error: "Category already exists." };
    return { error: "Failed to create category." };
  }
}

// ---------------------------------------------------------------------------
// PRODUCTS
// ---------------------------------------------------------------------------

export async function createProduct(data: { 
  name: string; 
  categoryId: string; 
  basePrice: number; 
  shortDesc?: string;
  description?: string;
  imageUrl?: string;
}) {
  await checkAdmin();
  try {
    const slug = slugify(data.name);
    
    // Convert float dollar amount to cents for DB
    const priceInCents = Math.round(data.basePrice * 100);

    const product = await db.product.create({
      data: {
        name: data.name,
        slug,
        categoryId: data.categoryId,
        basePrice: priceInCents,
        shortDesc: data.shortDesc,
        description: data.description,
        imageUrl: data.imageUrl,
        isActive: true,
      },
    });
    
    revalidatePath("/admin/products");
    revalidatePath("/products");
    
    return { success: true, productId: product.id };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') return { error: "Product name already exists." };
    return { error: "Failed to create product." };
  }
}

export async function toggleProductStatus(productId: string, isActive: boolean) {
  await checkAdmin();
  try {
    await db.product.update({
      where: { id: productId },
      data: { isActive },
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch {
    return { error: "Failed to update product." };
  }
}

// ---------------------------------------------------------------------------
// ORDERS
// ---------------------------------------------------------------------------

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await checkAdmin();
  try {
    await db.order.update({
      where: { id: orderId },
      data: { status },
    });
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath("/admin/orders");
    return { success: true };
  } catch {
    return { error: "Failed to update order status." };
  }
}
