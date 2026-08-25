import { db } from "@/lib/prisma";
import { FeaturedCategoriesCarousel } from "./featured-categories-carousel";

export async function FeaturedCategories() {
  // Fetch real categories from the database that are marked as featured
  const categories = await db.category.findMany({
    where: { 
      isFeatured: true,
      deletedAt: null 
    },
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      slug: true,
      name: true,
      imageUrl: true,
      _count: {
        select: { products: { where: { isActive: true, deletedAt: null } } }
      }
    },
    take: 10
  });

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-8">
        <FeaturedCategoriesCarousel categories={categories} />
      </div>
    </section>
  );
}
