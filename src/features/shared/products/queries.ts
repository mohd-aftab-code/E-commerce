import "server-only";
import { db } from "@/lib/prisma";

export async function getProducts() {
  return db.product.findMany({
    where: { isActive: true, deletedAt: null },
    include: {
      category: true,
      pricingTiers: {
        orderBy: { quantity: "asc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: { slug, isActive: true, deletedAt: null },
    include: {
      category: true,
      options: {
        orderBy: { sortOrder: "asc" },
        include: {
          values: { orderBy: { sortOrder: "asc" } },
        },
      },
      pricingTiers: { orderBy: { quantity: "asc" } },
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return db.category.findUnique({
    where: { slug },
  });
}

export async function getProductsByCategory(categorySlug: string) {
  return db.product.findMany({
    where: {
      isActive: true,
      deletedAt: null,
      category: { slug: categorySlug },
    },
    include: {
      category: true,
      pricingTiers: {
        orderBy: { quantity: "asc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllCategories() {
  return db.category.findMany({
    orderBy: { name: "asc" },
  });
}
