"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatePresence, motion } from "framer-motion";

const carouselData = [
  {
    src: "/images/promo_3d_1_1787733686220.jpg",
    subtitle: "Premium Printing Showcase",
    title: (
      <>
        Elevate Your Brand <br className="hidden md:block" /> With 3D Elegance
      </>
    ),
    description:
      "Explore our curated gallery of premium quality business cards, elegant packaging, and marketing materials designed to make a lasting impression on your clients.",
  },
  {
    src: "/images/promo_3d_2_1787733767935.jpg",
    subtitle: "Custom Packaging Solutions",
    title: (
      <>
        Unbox the Extraordinary <br className="hidden md:block" /> With Precision
      </>
    ),
    description:
      "Deliver a memorable unboxing experience with our custom-designed packaging boxes. Perfectly tailored to protect and showcase your products in style.",
  },
  {
    src: "/images/promo_3d_3_1787733783398.jpg",
    subtitle: "Striking Marketing Materials",
    title: (
      <>
        Make a Lasting Impact <br className="hidden md:block" /> Everywhere
      </>
    ),
    description:
      "From vibrant flyers to elegant brochures, our high-quality marketing prints ensure your brand stands out and captures attention in any setting.",
  },
];

export function LargePromoBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselData.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" className="relative overflow-hidden rounded-2xl bg-[#F0F4F8] text-[#2A2646]">
          
          <div className="flex flex-col md:flex-row items-center">
            
            {/* Text Content */}
            <div className="flex-1 p-10 md:p-16 lg:p-20 z-10 flex flex-col justify-center min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <span className="inline-block text-[#7B8B77] font-semibold tracking-wider text-sm mb-4 uppercase">
                    {carouselData[currentImageIndex]?.subtitle}
                  </span>
                  <h2 className="text-2xl sm:text-[28px] font-bold text-[#2A2646] tracking-tight mb-6">
                    {carouselData[currentImageIndex]?.title}
                  </h2>
                  <p className="text-gray-600 text-lg max-w-lg">
                    {carouselData[currentImageIndex]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image Content - Carousel */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-white overflow-hidden">
              <AnimatePresence>
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={carouselData[currentImageIndex]?.src || ""}
                    alt={`Premium print products 3D mockup ${currentImageIndex + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentImageIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </ScrollReveal>
      </div>
    </section>
  );
}
