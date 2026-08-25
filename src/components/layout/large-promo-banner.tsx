import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LargePromoBanner() {
  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#F0F4F8] text-[#2A2646]">
          
          <div className="flex flex-col md:flex-row items-center">
            
            {/* Text Content */}
            <div className="flex-1 p-10 md:p-16 lg:p-20 z-10">
              <span className="inline-block text-[#7B8B77] font-semibold tracking-wider text-sm mb-4 uppercase">
                Special Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                Elevate Your Brand <br className="hidden md:block" /> Up To 50% Off
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-lg">
                Premium quality business cards, elegant packaging, and marketing materials that make a lasting impression.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-end gap-2">
                  <span className="text-sm text-gray-500 pb-1">from</span>
                  <span className="text-3xl font-bold text-[#2A2646]">$19.99</span>
                </div>
                <Link
                  href="/products/business-cards"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary-900"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src="/images/large-promo-bg.jpg"
                alt="Premium print products mockup"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
