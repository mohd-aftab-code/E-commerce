import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { ProductDashboardClient } from "./product-dashboard-client"; // trigger TS refresh

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await db.product.findUnique({
    where: { id: resolvedParams.id },
  });
  
  if (!product) return { title: "Product Not Found" };
  return { title: `Edit ${product.name} | Admin Panel` };
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await db.product.findUnique({
    where: { id: resolvedParams.id },
    include: {
      options: {
        include: { values: true },
        orderBy: { sortOrder: 'asc' }
      },
      pricingTiers: {
        orderBy: { quantity: 'asc' }
      }
    }
  });

  if (!product) {
    notFound();
  }

  const categories = await db.category.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <Link href="/admin/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4">
          <FiArrowLeft className="mr-1 h-4 w-4" /> Back to Products
        </Link>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {product.name}
          </h2>
          <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {product.isActive ? 'Active' : 'Draft'}
          </span>
        </div>
      </div>

      <ProductDashboardClient 
        product={product} 
        categories={categories.map(c => ({ id: c.id, name: c.name }))} 
      />
    </div>
  );
}
