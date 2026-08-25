import { searchProducts } from "@/features/products/queries";
import { ProductCard } from "@/features/shared/products/components/product-card";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results | Print Studio 24",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const products = await searchProducts(q);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-brand-navy-900 sm:text-4xl">
            Search Results
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            {q ? (
              <>Showing results for: <span className="font-bold text-brand-navy-900">"{q}"</span></>
            ) : (
              "Please enter a search term to find products."
            )}
          </p>
        </div>

        {/* Results Grid */}
        {q && products.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">Found {products.length} product(s)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : q ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto">
            <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <FiSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-brand-navy-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-8">We couldn't find anything matching "{q}". Try adjusting your search or browsing our categories.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-brand-navy-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-royal-600 transition-colors"
              >
                Browse All Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-gray-200 bg-white text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
