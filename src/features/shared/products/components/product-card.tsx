import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { FiArrowRight, FiTruck, FiStar, FiPrinter } from "react-icons/fi";
import { WishlistButton } from "@/components/ui/wishlist-button";

type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    category: true;
    pricingTiers: true;
  };
}>;

interface ProductCardProps {
  product: ProductWithDetails;
  badge?: string;
}

export function ProductCard({ product, badge }: ProductCardProps) {
  const lowestTier = product.pricingTiers[0];
  const startingPrice = lowestTier ? lowestTier.price : product.basePrice;
  const startingQty = lowestTier?.quantity ?? 1;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <FiPrinter className="h-10 w-10 text-gray-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {badge && (
            <span className="bg-brand-cyan-500 text-brand-primary-900 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
              {badge}
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-primary-900/0 group-hover:bg-brand-primary-900/8 transition-colors duration-200 pointer-events-none" />

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-20">
          <WishlistButton product={product as any} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        {product.category && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
            {product.category.name}
          </span>
        )}

        {/* Name */}
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight group-hover:text-brand-primary-800 transition-colors">
          {product.name}
        </h3>

        {/* Short desc */}
        {product.shortDesc && (
          <p className="mt-1.5 text-[13px] text-gray-500 line-clamp-2 leading-relaxed mb-3">
            {product.shortDesc}
          </p>
        )}

        {/* Pricing + CTA */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
          <div>
            <p className="text-[11px] text-gray-400 font-medium">
              Starting at ({startingQty} pcs)
            </p>
            <p className="text-xl font-extrabold text-brand-primary-900 tracking-tight">
              {formatPrice(startingPrice)}
            </p>
          </div>
          <span className="flex items-center gap-1 text-[13px] font-bold text-brand-primary-800 group-hover:text-brand-primary-900 transition-colors">
            Order <FiArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        {/* Free shipping note */}
        {lowestTier && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-green-700 font-medium">
            <FiTruck className="h-3.5 w-3.5" />
            Free shipping on 500+ pieces
          </div>
        )}
      </div>
    </Link>
  );
}
