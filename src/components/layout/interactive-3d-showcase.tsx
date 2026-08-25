"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, Box } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Interactive3DShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track mouse position relative to center (-1 to 1)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to 3D rotation degrees
  const rotateX = useTransform(y, [-1, 1], [15, -15]); // Up/Down tilts X axis
  const rotateY = useTransform(x, [-1, 1], [-15, 15]); // Left/Right tilts Y axis
  
  // Map mouse position to a spotlight/glare position
  const glareX = useTransform(x, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [-1, 1], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate cursor position within the card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert to percentage from center (-1 to 1)
    const xPct = (mouseX / rect.width - 0.5) * 2;
    const yPct = (mouseY / rect.height - 0.5) * 2;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    // Reset back to flat smoothly
    x.set(0);
    y.set(0);
  };

  return (
    <section className="bg-white py-16 sm:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Text Content Area */}
          <ScrollReveal direction="left" className="w-full lg:w-5/12 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-[#7B8B77] font-semibold tracking-wider text-sm mb-4 uppercase">
              <Box className="w-4 h-4" /> Interactive 3D Preview
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-primary-900 mb-6 leading-tight">
              Visualize Your <br/> <span className="text-brand-primary-800">Premium Packaging</span>
            </h2>
            <p className="text-gray-500 text-[15px] sm:text-base leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Experience the quality of our custom prints before you order. Hover over the 3D model to examine the details, textures, and premium finish of our custom packaging boxes from every angle.
            </p>
            <Link
              href="/categories/packaging"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary-900"
            >
              Explore Packaging <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>

          {/* 3D Showcase Interactive Area */}
          <div className="w-full lg:w-7/12 flex justify-center perspective-[1500px]">
            <motion.div 
              ref={ref}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
              }}
              className="relative w-full max-w-[600px] aspect-[4/3] cursor-crosshair group"
            >
              {/* Product Image Layer (Pops out from base) */}
              <div 
                className="absolute inset-0 rounded-[2rem] overflow-hidden bg-transparent"
                style={{ transform: "translateZ(40px)" }}
              >
                <Image
                  src="/theme-images/3d-packaging.jpg"
                  alt="3D Interactive Packaging Box"
                  fill
                  className="object-cover shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                
                {/* Dynamic Lighting/Glare Layer */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-300 mix-blend-overlay"
                  style={{
                    background: glareBackground,
                  }}
                />
              </div>
              
              {/* Floating Tech-UI Element - Right */}
              <div 
                className="absolute -right-2 sm:-right-8 top-[30%] bg-white/90 backdrop-blur-md border border-gray-200 p-4 rounded-2xl shadow-xl flex flex-col gap-1.5 items-start w-36 sm:w-44 hidden sm:flex"
                style={{ transform: "translateZ(90px)" }}
              >
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Finish Type</span>
                <span className="text-brand-primary-900 font-bold text-sm">Holographic Gloss</span>
                <div className="w-full h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div className="w-4/5 h-full bg-brand-primary-800 rounded-full"></div>
                </div>
              </div>
              
              {/* Floating Tech-UI Element - Left */}
              <div 
                className="absolute -left-2 sm:-left-8 bottom-[20%] bg-white/90 backdrop-blur-md border border-gray-200 p-4 rounded-2xl shadow-xl flex flex-col gap-1.5 items-start w-36 sm:w-44 hidden sm:flex"
                style={{ transform: "translateZ(130px)" }}
              >
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Material</span>
                <span className="text-brand-primary-900 font-bold text-sm">Premium Corrugated</span>
                <div className="flex gap-1.5 mt-1">
                  <div className="w-2 h-2 rounded-full bg-brand-primary-800"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-primary-800/30"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-primary-800/30"></div>
                </div>
              </div>
              
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
