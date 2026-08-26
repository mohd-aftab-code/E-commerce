"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { reorderOrder } from "@/features/storefront/cart/actions";
import { RotateCcw, Loader2 } from "lucide-react";

export function ReorderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleReorder = () => {
    startTransition(async () => {
      const res = await reorderOrder(orderId);
      if (res.success) {
        router.push("/cart");
      } else {
        alert(res.error || "Failed to reorder");
      }
    });
  };

  return (
    <button
      onClick={handleReorder}
      disabled={isPending}
      className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-colors"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin text-brand-primary-800" />
      ) : (
        <RotateCcw className="h-4 w-4 text-brand-primary-800" />
      )}
      1-Click Reorder
    </button>
  );
}
