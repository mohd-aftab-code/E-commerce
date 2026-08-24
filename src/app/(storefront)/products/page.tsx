import { getProducts } from "@/features/shared/products/queries";
import { ProductCard } from "@/features/shared/products/components/product-card";

export const metadata = {
  title: "All Products | Print Studio 24",
  description: "Browse our premium selection of custom printing products.",
};

// Next.js App Router Server Component
export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            All Products
          </h1>
          <p className="mt-4 text-base text-gray-500">
            High-quality custom printing for businesses of all sizes. Select a product below to customize and get a real-time quote.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
