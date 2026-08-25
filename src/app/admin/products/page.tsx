import { db } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CategoryGroup } from "./category-group";

export const metadata = {
  title: "Manage Products | Admin Panel",
};

export default async function ProductsPage() {
  const products = await db.product.findMany({
    where: { deletedAt: null },
    orderBy: [
      { category: { name: "asc" } },
      { name: "asc" }
    ],
    include: {
      category: true,
    }
  });

  const groupedProducts = products.reduce((groups, product) => {
    const categoryName = product.category.name;
    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }
    groups[categoryName].push(product);
    return groups;
  }, {} as Record<string, typeof products>);

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Products
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            A list of all the products in your store including their price, category, and status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="-ml-1 mr-2 h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Product</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Base Price</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          {Object.keys(groupedProducts).length === 0 ? (
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td colSpan={4} className="py-12 text-center text-sm text-gray-500">
                  No products found. Click &quot;Add Product&quot; to create your first product.
                </td>
              </tr>
            </tbody>
          ) : (
            Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
              <CategoryGroup 
                key={categoryName} 
                categoryName={categoryName} 
                products={categoryProducts} 
              />
            ))
          )}
        </table>
      </div>
    </div>
  );
}
