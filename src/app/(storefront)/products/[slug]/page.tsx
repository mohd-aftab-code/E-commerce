import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/shared/products/queries";
import { ProductCustomizer } from "@/features/shared/products/components/product-customizer";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) return { title: "Product Not Found" };
  
  return {
    title: `${product.name} | Print Studio 24`,
    description: product.shortDesc || product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 bg-[#f9f9f9]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-3 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-navy-800 transition-colors">Home</Link>
          <FiChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
          <Link href="/products" className="hover:text-brand-navy-800 transition-colors">Products</Link>
          <FiChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="mx-auto max-w-[1536px] px-4 pt-10 sm:px-6 lg:px-8">
        <ProductCustomizer product={product} />
      </div>
    </div>
  );
}
