import "server-only";
import { db } from "@/lib/prisma";

export async function getProducts() {
  return db.product.findMany({
    where: { isActive: true },
    include: {
      category: true,
      pricingTiers: {
        orderBy: { quantity: 'asc' },
        take: 1 // Just to get the starting price
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: { slug, isActive: true },
    include: {
      category: true,
      options: {
        orderBy: { sortOrder: 'asc' },
        include: {
          values: {
            orderBy: { sortOrder: 'asc' }
          }
        }
      },
      pricingTiers: {
        orderBy: { quantity: 'asc' }
      }
    }
  });
}
