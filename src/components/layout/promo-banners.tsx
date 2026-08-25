import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function PromoBanners() {
  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Banner 1: Art Design */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="group relative flex items-center overflow-hidden rounded-2xl bg-[#e2e8f0] p-6 sm:p-8 md:p-6 lg:p-12 xl:py-16 min-h-[220px] sm:min-h-[300px] md:min-h-[280px] lg:min-h-[360px] xl:min-h-[400px] transition-transform hover:-translate-y-1 shadow-sm">
              <div className="relative z-10 w-[60%] sm:w-[55%] md:w-[60%] xl:w-[50%] flex flex-col items-start text-left">
                <h3 className="text-xl sm:text-2xl md:text-xl lg:text-[32px] xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
                  Free Expert Art<br />Design
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-xs lg:text-[15px] xl:text-base mb-4 sm:mb-8 md:mb-6 lg:mb-8 max-w-[250px] leading-relaxed">
                  This professional designing service is free to try.
                </p>
                <Link
                  href="/services/design"
                  className="inline-flex items-center justify-center rounded-full bg-brand-primary-800 px-5 py-2 sm:px-6 sm:py-2.5 md:px-5 md:py-2 lg:px-6 lg:py-2.5 text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] font-semibold text-white shadow-sm hover:bg-brand-primary-900 transition-colors"
                >
                  Shop Now <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
              
              {/* Image container with gradient mask for seamless blending */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-[55%] md:w-[50%] h-full transition-transform duration-500 group-hover:scale-105"
                style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)' }}
              >
                <Image
                  src="/theme-images/promo-brochure.jpg"
                  alt="Expert Art Design Brochure"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Banner 2: Custom T-Shirts */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="group relative flex items-center overflow-hidden rounded-2xl bg-[#cce6ff] p-6 sm:p-8 md:p-6 lg:p-12 xl:py-16 min-h-[220px] sm:min-h-[300px] md:min-h-[280px] lg:min-h-[360px] xl:min-h-[400px] transition-transform hover:-translate-y-1 shadow-sm">
              <div className="relative z-10 w-[60%] sm:w-[55%] md:w-[60%] xl:w-[50%] flex flex-col items-start text-left">
                <h3 className="text-xl sm:text-2xl md:text-xl lg:text-[32px] xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
                  Create Custom<br />T-Shirts
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-xs lg:text-[15px] xl:text-base mb-4 sm:mb-8 md:mb-6 lg:mb-8 max-w-[250px] leading-relaxed">
                  Design your own T-shirt in minutes
                </p>
                <Link
                  href="/categories/apparel"
                  className="inline-flex items-center justify-center rounded-full bg-brand-primary-800 px-5 py-2 sm:px-6 sm:py-2.5 md:px-5 md:py-2 lg:px-6 lg:py-2.5 text-[12px] sm:text-[14px] md:text-[12px] lg:text-[14px] font-semibold text-white shadow-sm hover:bg-brand-primary-900 transition-colors"
                >
                  Shop Now <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>
              
              {/* Image container with gradient mask for seamless blending */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-[55%] md:w-[50%] h-full transition-transform duration-500 group-hover:scale-105"
                style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)' }}
              >
                <Image
                  src="/theme-images/promo-tshirt.jpg"
                  alt="Custom T-Shirts Mockup"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
