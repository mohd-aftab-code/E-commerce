"use client";

import { useState } from "react";
import { CategoryForm } from "./category-form";
import { deleteCategory } from "@/features/admin/actions";
import { Edit2, Trash2 } from "lucide-react";

type CategoryWithCount = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  parentId: string | null;
  parent: { name: string } | null;
  _count: { products: number };
};

export function CategoryManager({ categories }: { categories: CategoryWithCount[] }) {
  const [editingCategory, setEditingCategory] = useState<CategoryWithCount | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const simplifiedCategories = categories.map(c => ({ id: c.id, name: c.name }));

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this category?")) {
      setIsDeleting(id);
      await deleteCategory(id);
      setIsDeleting(null);
      if (editingCategory?.id === id) {
        setEditingCategory(null);
      }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Category List */}
      <div className="md:col-span-2">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Parent</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Products</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-gray-500">
                    No categories found. Create one to get started.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className={editingCategory?.id === category.id ? "bg-brand-cyan-50/50" : ""}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {category.name}
                      <div className="text-xs text-gray-500 font-normal">{category.slug}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {category.parent ? (
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          {category.parent.name}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category._count.products}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingCategory(category)}
                          className="text-gray-400 hover:text-brand-navy-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          disabled={isDeleting === category.id}
                          className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Column */}
      <div className="md:col-span-1">
        <div className="bg-white shadow sm:rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>
            {editingCategory && (
              <button 
                onClick={() => setEditingCategory(null)}
                className="text-sm text-brand-navy-800 hover:underline"
              >
                Cancel Edit
              </button>
            )}
          </div>
          
          <CategoryForm 
            // Add a key so the form fully resets state when switching categories
            key={editingCategory ? editingCategory.id : 'new'} 
            categories={simplifiedCategories} 
            initialData={editingCategory}
            onSuccess={() => setEditingCategory(null)}
          />
        </div>
      </div>
    </div>
  );
}
