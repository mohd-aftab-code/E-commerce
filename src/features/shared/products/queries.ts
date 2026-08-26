import "server-only";
import { db } from "@/lib/prisma";
import { cache } from "react";

export const getProducts = cache(async () => {
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
});

export const getProductBySlug = cache(async (slug: string) => {
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
});

export const getCategoryBySlug = cache(async (slug: string) => {
  return db.category.findUnique({
    where: { slug },
  });
});

export const getProductsByCategory = cache(async (categorySlug: string) => {
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
});

export const getAllCategories = cache(async () => {
  return db.category.findMany({
    orderBy: { name: "asc" },
  });
});
