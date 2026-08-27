import "server-only";
import { db } from "@/lib/prisma";
import type { Category, Product, Prisma } from "@prisma/client";

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
        isFeatured: true, // Only show categories marked as featured by admin
        products: {
          some: {
            isActive: true,
            deletedAt: null,
          },
        },
      },
      take: 5, // Limit to 5 categories max for the UI as requested
      include: {
        products: {
          where: {
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

export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    category: true;
    pricingTiers: true;
  };
}>;

/**
 * Searches for active products by name or short description.
 */
export async function searchProducts(query: string): Promise<ProductWithDetails[]> {
  try {
    if (!query || query.trim() === "") return [];
    
    return await db.product.findMany({
      where: {
        isActive: true,
        deletedAt: null,
        OR: [
          { name: { contains: query } },
          { shortDesc: { contains: query } },
          { description: { contains: query } },
        ]
      },
      include: {
        category: true,
        pricingTiers: {
          orderBy: {
            quantity: 'asc'
          }
        }
      },
      orderBy: {
        isPopular: 'desc', // Show popular products first in search results
      }
    });
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}
