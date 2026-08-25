import "server-only";
import { db } from "@/lib/prisma";
import type { Category, Product } from "@prisma/client";

export type CategoryWithPopularProducts = Category & {
  products: Product[];
};

/**
 * Fetches all active categories that have at least one popular product.
 * The products array inside each category will only contain popular, active products.
 */
export async function getPopularProductsByCategory(): Promise<CategoryWithPopularProducts[]> {
  try {
    const categories = await db.category.findMany({
      where: {
        deletedAt: null,
        products: {
          some: {
            isPopular: true,
            isActive: true,
            deletedAt: null,
          },
        },
      },
      include: {
        products: {
          where: {
            isPopular: true,
            isActive: true,
            deletedAt: null,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 8 // Limit to 8 popular products per category for the UI
        },
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching popular products by category:", error);
    return [];
  }
}
