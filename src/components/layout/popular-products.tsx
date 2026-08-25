"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CategoryWithPopularProducts } from "@/features/products/queries";
import { formatPrice } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface PopularProductsProps {
  categories: CategoryWithPopularProducts[];
}

export function PopularProducts({ categories }: PopularProductsProps) {
  const firstCategory = categories?.[0];

  // If no categories have popular products, don't render the section
  if (!categories || categories.length === 0 || !firstCategory) {
    return null;
  }

  // Set the first category as the active tab initially
  const [activeCategoryId, setActiveCategoryId] = useState<string>(firstCategory.id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];
  if (!activeCategory) return null;
  
  const products = activeCategory.products;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        
        {/* Header and Tabs */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
            <h2 className="text-2xl sm:text-[28px] font-bold text-[#2A2646] tracking-tight">
              Popular Products
            </h2>
            
            <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => {
                const isActive = category.id === activeCategoryId;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`whitespace-nowrap px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all cursor-pointer ${
                      isActive 
                        ? "bg-[#D2C5EB] text-[#3B2D60]" 
                        : "text-[#3B2D60] hover:bg-gray-50"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Products Grid / Carousel */}
          <ScrollReveal direction="up" delay={0.2} className="relative group max-w-full">
            {/* Desktop Left Arrow */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-[-20px] top-[40%] -translate-y-1/2 w-9 h-9 bg-white border border-gray-100 rounded-full items-center justify-center shadow-sm z-10 hidden xl:flex text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Horizontal scroll container for all sizes */}
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-6 scrollbar-hide pb-4 lg:gap-8"
            >
              {products.map((product, index) => (
                <Link 
                  href={`/products/${product.slug}`} 
                  key={product.id}
                  className="group flex flex-col w-[160px] shrink-0 sm:w-[320px] lg:w-[280px] snap-start"
                >
                  {/* Image Box */}
                  <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden mb-3 sm:mb-5 flex items-center justify-center transition-transform duration-300">
                    {index === 2 && ( // Example of discount badge from design
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#FFB000] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm z-10">
                        -21%
                      </div>
                    )}
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-sm">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="text-center px-2">
                    <h3 className="text-[15px] font-bold text-[#2A2646] mb-1 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      {index === 2 ? (
                        <>
                          <span className="text-[13px] font-medium text-gray-400 line-through">
                            $19
                          </span>
                          <span className="text-[14px] font-semibold text-[#3B2D60]">
                            $15
                          </span>
                        </>
                      ) : (
                        <span className="text-[14px] font-semibold text-[#3B2D60]">
                          {formatPrice(product.basePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop Right Arrow */}
            <button 
              onClick={() => scroll('right')}
              className="absolute right-[-20px] top-[40%] -translate-y-1/2 w-9 h-9 bg-white border border-gray-100 rounded-full items-center justify-center shadow-sm z-10 hidden xl:flex text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollReveal>

        </div>
      </section>
    );
  }
