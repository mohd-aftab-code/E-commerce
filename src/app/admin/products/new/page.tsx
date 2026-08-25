import { db } from "@/lib/prisma";
import { ProductForm } from "./product-form";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "Add New Product | Admin Panel",
};

export default async function NewProductPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <Link href="/admin/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4">
          <FiArrowLeft className="mr-1 h-4 w-4" /> Back to Products
        </Link>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Add New Product
        </h2>
      </div>

      <div className="bg-white shadow sm:rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <ProductForm categories={categories.map(c => ({ id: c.id, name: c.name }))} />
        </div>
      </div>
    </div>
  );
}
