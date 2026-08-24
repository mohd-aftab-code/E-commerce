import { db } from "@/lib/prisma";
import { createProduct } from "@/features/admin/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Add New Product | Admin Panel",
};

export default async function NewProductPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <Link href="/admin/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Products
        </Link>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Add New Product
        </h2>
      </div>

      <div className="bg-white shadow sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <form action={async (formData) => {
            "use server";
            const result = await createProduct({
              name: formData.get("name") as string,
              categoryId: formData.get("categoryId") as string,
              basePrice: parseFloat(formData.get("basePrice") as string),
              shortDesc: formData.get("shortDesc") as string,
              description: formData.get("description") as string,
              imageUrl: formData.get("imageUrl") as string,
            });
            if (result.success) {
              redirect("/admin/products");
            }
          }} className="space-y-6">
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g. Standard Business Cards"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Base Price (USD)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="basePrice"
                    id="basePrice"
                    required
                    step="0.01"
                    min="0"
                    className="block w-full rounded-md border border-gray-300 pl-7 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
                <div className="mt-1">
                  <select
                    id="categoryId"
                    name="categoryId"
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm bg-white"
                  >
                    <option value="">Select a category...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                {categories.length === 0 && (
                  <p className="mt-2 text-sm text-red-600">You must create a category first.</p>
                )}
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="imageUrl"
                    id="imageUrl"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-700">Short Description</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="shortDesc"
                    id="shortDesc"
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="A brief tagline for the product card"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Full Description</label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Detailed product information..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-gray-200 flex justify-end gap-3">
              <Link
                href="/admin/products"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={categories.length === 0}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
