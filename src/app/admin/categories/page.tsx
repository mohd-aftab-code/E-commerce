import { db } from "@/lib/prisma";
import { CategoryManager } from "./category-manager";

export const metadata = {
  title: "Manage Categories | Admin Panel",
};

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { products: { where: { deletedAt: null } } }
      },
      parent: {
        select: { name: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Categories
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage product categories for the storefront.
        </p>
      </div>

      <CategoryManager categories={categories} />
    </div>
  );
}
