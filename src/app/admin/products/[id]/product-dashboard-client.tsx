"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/ui/image-upload";
import { updateProductBase } from "@/features/admin/actions";
import { ProductOptionsTab } from "./product-options-tab";
import { ProductPricingTab } from "./product-pricing-tab";

type Tab = "basic" | "options" | "pricing";

export function ProductDashboardClient({ product, categories }: any) {
  const [activeTab, setActiveTab] = useState<Tab>("basic");

  return (
    <div className="bg-white shadow sm:rounded-lg border border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {[
            { id: "basic", name: "Basic Info" },
            { id: "options", name: "Product Options" },
            { id: "pricing", name: "Quantity Pricing" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? "border-brand-navy-800 text-brand-navy-800"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === "basic" && (
          <BasicInfoTab product={product} categories={categories} />
        )}
        {activeTab === "options" && (
          <ProductOptionsTab productId={product.id} initialOptions={product.options || []} />
        )}
        {activeTab === "pricing" && (
          <ProductPricingTab productId={product.id} initialTiers={product.pricingTiers || []} />
        )}
      </div>
    </div>
  );
}

function BasicInfoTab({ product, categories }: any) {
  const [imageUrl, setImageUrl] = useState(product.imageUrl || "");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const data = {
      name: formData.get("name") as string,
      categoryId: formData.get("categoryId") as string,
      basePrice: parseFloat(formData.get("basePrice") as string),
      shortDesc: formData.get("shortDesc") as string,
      description: formData.get("description") as string,
      imageUrl: imageUrl,
      isPopular: formData.get("isPopular") === "on",
    };

    const result = await updateProductBase(product.id, data);
    if (!result.success) {
      alert(result.error);
    } else {
      alert("Product updated successfully!");
    }
    setIsLoading(false);
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={product.name}
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
              defaultValue={(product.basePrice / 100).toFixed(2)}
              required
              step="0.01"
              min="0"
              className="block w-full rounded-md border border-gray-300 pl-7 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
          <div className="mt-1">
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={product.categoryId}
              required
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm bg-white"
            >
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-6">
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            folder="products"
            label="Product Image"
          />
          <input type="hidden" name="imageUrl" value={imageUrl} />
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-700">Short Description</label>
          <div className="mt-1">
            <input
              type="text"
              name="shortDesc"
              id="shortDesc"
              defaultValue={product.shortDesc || ""}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
              defaultValue={product.description || ""}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-6 mt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPopular"
              name="isPopular"
              defaultChecked={product.isPopular}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isPopular" className="text-sm font-medium text-gray-700">
              Mark as Popular Product (shows on the homepage)
            </label>
          </div>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-200 flex justify-end gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
