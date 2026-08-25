"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import type { Product } from "@prisma/client";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface WishlistButtonProps {
  product: Product;
  className?: string;
}

export function WishlistButton({ product, className = "" }: WishlistButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { isInWishlist, addItem, removeItem } = useWishlist();

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={`p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 transition-colors ${className}`}>
        <Heart className="w-5 h-5" />
      </button>
    );
  }

  const isLiked = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page if inside a Link
    if (isLiked) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`p-2 rounded-full transition-colors shadow-sm z-20 ${
        isLiked 
          ? "bg-red-50 text-red-500 hover:bg-red-100" 
          : "bg-white/90 text-gray-400 hover:bg-white hover:text-red-500"
      } ${className}`}
      title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isLiked ? "fill-red-500 scale-110" : ""}`} />
    </button>
  );
}
