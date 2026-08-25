"use client";

import { useState, useEffect } from "react";
import { createCategory, updateCategory } from "@/features/admin/actions";
import { ImageUpload } from "@/components/ui/image-upload";

type InitialData = {
  id: string;
  name: string;
  description?: string | null;
  parentId?: string | null;
  imageUrl?: string | null;
};

export function CategoryForm({ 
  categories, 
  initialData,
  onSuccess
}: { 
  categories: { id: string; name: string }[];
  initialData?: InitialData | null;
  onSuccess?: () => void;
}) {
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setImageUrl(initialData.imageUrl || "");
    }
  }, [initialData]);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    formData.append("imageUrl", imageUrl);
    
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      parentId: formData.get("parentId") as string,
      imageUrl: formData.get("imageUrl") as string,
    };

    if (isEditing && initialData) {
      await updateCategory(initialData.id, data);
    } else {
      await createCategory(data);
    }
    
    setIsLoading(false);
    
    if (onSuccess) {
      onSuccess();
    } else if (!isEditing) {
      // Reset form after submission if it's not a modal edit
      const form = document.getElementById("category-form") as HTMLFormElement;
      if (form) form.reset();
      setImageUrl("");
    }
  }

  return (
    <form id="category-form" action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={initialData?.name}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-cyan-500 focus:outline-none focus:ring-brand-cyan-500 sm:text-sm"
          placeholder="e.g. Business Cards"
        />
      </div>

      <div>
        <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">Parent Category</label>
        <select
          name="parentId"
          id="parentId"
          defaultValue={initialData?.parentId || ""}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-cyan-500 focus:outline-none focus:ring-brand-cyan-500 sm:text-sm bg-white"
        >
          <option value="">None (Top Level)</option>
          {categories.filter(c => c.id !== initialData?.id).map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional)</label>
        <textarea
          name="description"
          id="description"
          rows={3}
          defaultValue={initialData?.description || ""}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-cyan-500 focus:outline-none focus:ring-brand-cyan-500 sm:text-sm"
          placeholder="A short description"
        />
      </div>

      <div>
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          folder="categories"
          label="Category Image"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : isEditing ? "Update Category" : "Create Category"}
      </button>
    </form>
  );
}
