import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/products/queries";
import { ProductCustomizer } from "@/features/products/components/product-customizer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center text-sm text-gray-500">
          <Link href="/products" className="hover:text-brand-royal-600 transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <ProductCustomizer product={product} />
      </div>
    </div>
  );
}
