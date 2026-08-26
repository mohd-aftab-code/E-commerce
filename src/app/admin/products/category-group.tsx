"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ProductActions } from "./product-actions";
import { ChevronDown, ChevronRight } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  basePrice: number;
  isActive: boolean;
};

export function CategoryGroup({ 
  categoryName, 
  products 
}: { 
  categoryName: string; 
  products: Product[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr 
        className="border-t border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <th
          colSpan={4}
          scope="colgroup"
          className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 select-none"
        >
          <div className="flex items-center gap-2">
            {isOpen ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
            {categoryName} <span className="text-gray-400 font-normal">({products.length})</span>
          </div>
        </th>
      </tr>
      {isOpen && products.map((product) => (
        <tr key={product.id}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0">
                {product.imageUrl ? (
                  <Image className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt="" width={40} height={40} />
                ) : (
                  <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                    No img
                  </div>
                )}
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-gray-500">{product.slug}</div>
              </div>
            </div>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {formatPrice(product.basePrice)}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {product.isActive ? (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Active
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                Draft
              </span>
            )}
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <ProductActions productId={product.id} productName={product.name} productSlug={product.slug} isActive={product.isActive} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
