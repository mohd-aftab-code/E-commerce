import { db } from "@/lib/prisma";
import { createCategory } from "@/features/admin/actions";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Manage Categories | Admin Panel",
};

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { products: true }
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Category List */}
        <div className="md:col-span-2">
          <div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Slug</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Products</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-sm text-gray-500">
                      No categories found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {category.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.slug}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category._count.products}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Category Form */}
        <div className="md:col-span-1">
          <div className="bg-white shadow sm:rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Add New Category</h3>
            
            <form action={async (formData) => {
              "use server";
              const name = formData.get("name") as string;
              const description = formData.get("description") as string;
              await createCategory({ name, description });
            }} className="space-y-4">
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-cyan-500 focus:outline-none focus:ring-brand-cyan-500 sm:text-sm"
                  placeholder="e.g. Business Cards"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-cyan-500 focus:outline-none focus:ring-brand-cyan-500 sm:text-sm"
                  placeholder="A short description"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
