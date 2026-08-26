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

export async function createCategory(data: { name: string; description?: string; parentId?: string; imageUrl?: string }) {
  await checkAdmin();
  try {
    const slug = slugify(data.name);
    await db.category.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        ...(data.parentId ? { parent: { connect: { id: data.parentId } } } : {}),
        imageUrl: data.imageUrl || null,
      },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/products/new");
    revalidatePath("/admin/products/[id]", "page");
    return { success: true };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') return { error: "Category already exists." };
    return { error: "Failed to create category." };
  }
}

export async function updateCategory(id: string, data: { name: string; description?: string; parentId?: string; imageUrl?: string }) {
  await checkAdmin();
  try {
    const slug = slugify(data.name);
    await db.category.update({
      where: { id },
      data: {
        name: data.name,
        slug,
        description: data.description,
        parent: data.parentId ? { connect: { id: data.parentId } } : { disconnect: true },
        imageUrl: data.imageUrl || null,
      },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/products/new");
    revalidatePath("/admin/products/[id]", "page");
    return { success: true };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') return { error: "Category name already exists." };
    return { error: "Failed to update category." };
  }
}

export async function deleteCategory(id: string) {
  await checkAdmin();
  try {
    await db.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    revalidatePath("/admin/categories");
    revalidatePath("/admin/products/new");
    revalidatePath("/admin/products/[id]", "page");
    return { success: true };
  } catch (error: unknown) {
    return { error: "Failed to delete category." };
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

export async function updateProductBase(productId: string, data: { 
  name: string; 
  categoryId: string; 
  basePrice: number; 
  shortDesc?: string;
  description?: string;
  imageUrl?: string;
  isPopular?: boolean;
}) {
  await checkAdmin();
  try {
    const priceInCents = Math.round(data.basePrice * 100);
    const slug = slugify(data.name);

    await db.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        slug,
        categoryId: data.categoryId,
        basePrice: priceInCents,
        shortDesc: data.shortDesc,
        description: data.description,
        imageUrl: data.imageUrl,
        isPopular: data.isPopular,
      },
    });
    
    revalidatePath(`/admin/products/${productId}`);
    revalidatePath("/admin/products");
    revalidatePath("/products");
    
    return { success: true };
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') return { error: "Product name already exists." };
    return { error: "Failed to update product." };
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

export async function deleteProduct(id: string) {
  await checkAdmin();
  try {
    await db.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error: unknown) {
    return { error: "Failed to delete product." };
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

// ---------------------------------------------------------------------------
// PRODUCT OPTIONS & PRICING
// ---------------------------------------------------------------------------

export async function saveProductOptions(productId: string, options: {
  id?: string;
  name: string;
  type: string;
  isRequired: boolean;
  sortOrder: number;
  values: {
    id?: string;
    label: string;
    priceModifier: number;
    isDefault: boolean;
    sortOrder: number;
  }[];
}[]) {
  await checkAdmin();
  try {
    await db.$transaction(async (tx) => {
      // Delete options not in the payload
      const incomingOptionIds = options.filter(o => o.id).map(o => o.id as string);
      await tx.productOption.deleteMany({
        where: {
          productId,
          id: { notIn: incomingOptionIds }
        }
      });

      // Upsert each option
      for (const opt of options) {
        if (opt.id) {
          // Update option
          await tx.productOption.update({
            where: { id: opt.id },
            data: {
              name: opt.name,
              type: opt.type,
              isRequired: opt.isRequired,
              sortOrder: opt.sortOrder,
            }
          });
          
          // Delete removed values for this option
          const incomingValueIds = opt.values.filter(v => v.id).map(v => v.id as string);
          await tx.optionValue.deleteMany({
            where: {
              optionId: opt.id,
              id: { notIn: incomingValueIds }
            }
          });

          // Upsert values
          for (const val of opt.values) {
            if (val.id) {
              await tx.optionValue.update({
                where: { id: val.id },
                data: {
                  label: val.label,
                  priceModifier: val.priceModifier,
                  isDefault: val.isDefault,
                  sortOrder: val.sortOrder,
                }
              });
            } else {
              await tx.optionValue.create({
                data: {
                  optionId: opt.id,
                  label: val.label,
                  priceModifier: val.priceModifier,
                  isDefault: val.isDefault,
                  sortOrder: val.sortOrder,
                }
              });
            }
          }
        } else {
          // Create new option with its values
          await tx.productOption.create({
            data: {
              productId,
              name: opt.name,
              type: opt.type,
              isRequired: opt.isRequired,
              sortOrder: opt.sortOrder,
              values: {
                create: opt.values.map(v => ({
                  label: v.label,
                  priceModifier: v.priceModifier,
                  isDefault: v.isDefault,
                  sortOrder: v.sortOrder,
                }))
              }
            }
          });
        }
      }
    });

    revalidatePath(`/admin/products/${productId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to save product options", error);
    return { error: "Failed to save product options." };
  }
}

export async function savePricingTiers(productId: string, tiers: {
  quantity: number;
  price: number;
}[]) {
  await checkAdmin();
  try {
    await db.$transaction(async (tx) => {
      await tx.pricingTier.deleteMany({
        where: { productId }
      });
      if (tiers.length > 0) {
        await tx.pricingTier.createMany({
          data: tiers.map(t => ({
            productId,
            quantity: t.quantity,
            price: t.price
          }))
        });
      }
    });

    revalidatePath(`/admin/products/${productId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to save pricing tiers", error);
    return { error: "Failed to save pricing tiers." };
  }
}

// ---------------------------------------------------------------------------
// LEADS
// ---------------------------------------------------------------------------

export async function updateLeadStatus(leadId: string, status: string) {
  await checkAdmin();
  try {
    await db.lead.update({
      where: { id: leadId },
      data: { status },
    });
    revalidatePath("/admin/leads");
    return { success: true };
  } catch {
    return { error: "Failed to update lead status." };
  }
}

export async function deleteLead(leadId: string) {
  await checkAdmin();
  try {
    await db.lead.delete({
      where: { id: leadId },
    });
    revalidatePath("/admin/leads");
    return { success: true };
  } catch {
    return { error: "Failed to delete lead." };
  }
}
