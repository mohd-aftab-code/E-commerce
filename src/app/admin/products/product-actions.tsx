"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProduct } from "@/features/admin/actions";
import { Trash2 } from "lucide-react";

export function ProductActions({ productId, productName, productSlug }: { productId: string; productName: string; productSlug: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (confirm(`Are you sure you want to delete ${productName}?`)) {
      setIsDeleting(true);
      await deleteProduct(productId);
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <Link href={`/products/${productSlug}`} target="_blank" className="text-gray-500 hover:text-gray-900 font-medium text-sm">
        View<span className="sr-only">, {productName}</span>
      </Link>
      <Link href={`/admin/products/${productId}`} className="text-blue-600 hover:text-blue-900 font-medium text-sm">
        Edit<span className="sr-only">, {productName}</span>
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete {productName}</span>
      </button>
    </div>
  );
}
