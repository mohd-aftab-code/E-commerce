import React from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const categoryDesigns = [
  { name: "Premium Business Cards", src: "/images/promo_business_cards_1787734250581.jpg" },
  { name: "Vibrant Event Flyers", src: "/images/promo_flyers_1787734263475.jpg" },
  { name: "Large Format Banners", src: "/images/promo_banners_1787734280250.jpg" },
  { name: "Acrylic Signs", src: "/images/promo_signs_1787734294057.jpg" },
];

export function CategoryDesignGallery() {
  return (
    <section className="bg-white py-12 md:py-24">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-left mb-12 md:mb-16">
            <span className="inline-block text-[#7B8B77] font-bold tracking-widest text-sm mb-4 uppercase">
              Category Designs
            </span>
            <h2 className="text-2xl sm:text-[28px] font-bold text-[#2A2646] tracking-tight mb-6">
              Our Premium Quality
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl">
              Get inspired by our highly detailed, photorealistic 3D mockups. Experience the quality of our prints before you even place an order.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
            {categoryDesigns.map((design, index) => (
              <ScrollReveal 
                key={index} 
                direction="up" 
                delay={index * 0.1}
                className="relative group flex flex-col items-center transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square flex items-center justify-center mb-6">
                  <Image 
                    src={design.src} 
                    alt={design.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl" 
                  />
                </div>
                
                {/* Text */}
                <h3 className="text-[#1a202c] font-bold text-xl md:text-2xl text-center group-hover:text-[#7B8B77] transition-colors">
                  {design.name}
                </h3>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
