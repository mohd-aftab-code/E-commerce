"use client";

import { useState } from "react";
import { createProduct } from "@/features/admin/actions";
import { ImageUpload } from "@/components/ui/image-upload";
import { useRouter } from "next/navigation";

export function ProductForm({ categories }: { categories: { id: string; name: string }[] }) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    
    const data = {
      name: formData.get("name") as string,
      categoryId: formData.get("categoryId") as string,
      basePrice: parseFloat(formData.get("basePrice") as string),
      shortDesc: formData.get("shortDesc") as string,
      description: formData.get("description") as string,
      imageUrl: imageUrl,
    };

    const result = await createProduct(data);
    
    if (result.success) {
      router.push(`/admin/products/${result.productId}`);
    } else {
      alert(result.error);
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-gray-900 sm:text-sm"
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
              className="block w-full rounded-md border border-gray-300 pl-7 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-gray-900 sm:text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
          <div className="mt-1">
            <select
              id="categoryId"
              name="categoryId"
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-gray-900 sm:text-sm bg-white"
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
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            folder="products"
            label="Product Image"
          />
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-700">Short Description</label>
          <div className="mt-1">
            <input
              type="text"
              name="shortDesc"
              id="shortDesc"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-gray-900 sm:text-sm"
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
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-gray-900 sm:text-sm"
              placeholder="Detailed product information..."
            />
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-200 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={categories.length === 0 || isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Product & Continue to Pricing"}
        </button>
      </div>
    </form>
  );
}
