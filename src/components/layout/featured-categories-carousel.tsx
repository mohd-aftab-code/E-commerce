"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Package } from "lucide-react";

// Blue shades matching the hero section
const themeColors = [
  { bg: "bg-[#d6e4f0]", icon: "text-[#1d3a5f]" },
  { bg: "bg-[#1d3a5f]", icon: "text-white/90" },
  { bg: "bg-[#b8d4e8]", icon: "text-[#1d3a5f]" },
  { bg: "bg-[#e8f0f7]", icon: "text-[#2c5f8a]" },
  { bg: "bg-[#c8dcee]", icon: "text-[#1d3a5f]" },
  { bg: "bg-[#2c5f8a]", icon: "text-white/90" },
];

type CategoryItem = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  _count: {
    products: number;
  };
};

export function FeaturedCategoriesCarousel({ categories }: { categories: CategoryItem[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // Each card is 200px + 24px gap = 224px. Scroll by roughly 2 items (448px)
      const scrollAmount = 448; 
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <p className="text-gray-500">No featured categories found. Please add them from the admin panel.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[28px] font-bold text-[#1d3a5f]">Featured Categories</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => scroll("left")}
            className="text-gray-400 hover:text-[#2c5f8a] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="text-gray-400 hover:text-[#2c5f8a] transition-colors cursor-pointer"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => {
          const theme = themeColors[index % themeColors.length]!;
          return (
            <Link 
              key={category.id}
              href={`/categories/${category.slug}`} 
              className="flex-none w-[200px] group"
            >
              {/* Card Background - Light gray, sharp/minimal rounding, no border or shadow */}
              <div className="bg-[#f2f4f7] rounded-sm pt-8 pb-6 flex flex-col items-center justify-between h-[230px] hover:bg-[#e9ebf0] transition-colors">
                
                <div className="relative">
                  {/* Circle Image Wrapper */}
                  <div className={`w-[130px] h-[130px] rounded-full flex items-center justify-center overflow-hidden ${theme.bg} group-hover:scale-105 transition-transform duration-300`}>
                    {category.imageUrl ? (
                       <Image 
                         src={category.imageUrl} 
                         alt={category.name} 
                         width={130} 
                         height={130} 
                         className="object-cover w-full h-full" 
                       />
                    ) : (
                       <Package className={`h-12 w-12 ${theme.icon}`} strokeWidth={1.5} />
                    )}
                  </div>
                  
                  {/* Sequence Number Badge */}
                  <div className="absolute top-1 -left-1 z-10 bg-[#1d3a5f] text-white text-[12px] font-bold w-[28px] h-[28px] rounded-full flex items-center justify-center border-2 border-[#f2f4f7] group-hover:border-[#e9ebf0] transition-colors">
                    {index + 1}
                  </div>
                </div>
                
                {/* Category Title */}
                <h3 className="text-[15px] font-medium text-[#1d3a5f] text-center mt-6">
                  {category.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
