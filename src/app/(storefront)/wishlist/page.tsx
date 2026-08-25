"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import { ProductCard } from "@/features/shared/products/components/product-card";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem } = useWishlist();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-2">My Wishlist</h1>
        <p className="text-gray-500 mb-10">
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </p>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product as any} />
                <button
                  onClick={() => removeItem(product.id)}
                  className="absolute top-3 left-3 z-30 bg-white/90 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded text-xs font-bold shadow-sm transition-colors opacity-0 group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-200 max-w-2xl mx-auto mt-10">
            <div className="mx-auto h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save items you love so you can easily find them later.</p>
            <Link
              href="/products"
              className="inline-flex rounded-md bg-brand-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-royal-600 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
