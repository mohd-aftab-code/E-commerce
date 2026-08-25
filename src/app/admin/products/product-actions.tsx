"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProduct } from "@/features/admin/actions";
import { Trash2 } from "lucide-react";

export function ProductActions({ productId, productName }: { productId: string; productName: string }) {
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
