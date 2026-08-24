import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Prisma } from "@prisma/client";

// Get the type of a product with its category and first pricing tier included
type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    category: true;
    pricingTiers: true;
  };
}>;

interface ProductCardProps {
  product: ProductWithDetails;
}

export function ProductCard({ product }: ProductCardProps) {
  const startingPrice = (product.pricingTiers && product.pricingTiers[0])
    ? product.pricingTiers[0].price 
    : product.basePrice;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center border-b border-gray-200 p-6 relative overflow-hidden">
        {/* Placeholder for Product Image - In real app, use next/image */}
        <div className="text-gray-400 font-medium z-10 text-center">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full absolute inset-0" />
          ) : (
            <span>No Image</span>
          )}
        </div>
        
        {/* Subtle Brand Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-brand-navy-900/0 transition-colors group-hover:bg-brand-navy-900/5 z-0" />
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-gray-900">
          <Link href={`/products/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.shortDesc || product.description}
        </p>
        
        <div className="mt-auto pt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">
            Starting at <span className="text-brand-royal-600 font-bold">{formatPrice(startingPrice)}</span>
          </p>
          <span className="text-sm font-semibold text-brand-royal-600 group-hover:text-brand-navy-900 transition-colors">
            Customize &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
