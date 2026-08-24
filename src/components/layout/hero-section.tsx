"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white h-[600px] flex items-center">
      {/* Background Image from Theme */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/theme-images/2024/02/slider-home5-2.jpg')" }}
      />
      {/* Overlay to ensure text readability if needed */}
      <div className="absolute inset-0 z-1 bg-black/10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-flex rounded-full bg-brand-cyan-500/20 px-3 py-1 text-sm font-semibold text-brand-navy-900 ring-1 ring-inset ring-brand-cyan-500/30 backdrop-blur-sm"
          >
            Premium Printing in Tampa, FL
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl font-extrabold tracking-tight text-brand-navy-900 sm:text-6xl mb-6 drop-shadow-md"
          >
            Bring Your Brand to <span className="text-brand-royal-600">Life</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 text-lg text-gray-800 mb-8 max-w-xl font-medium drop-shadow-sm"
          >
            Professional custom printing services for businesses of all sizes. From high-quality business cards to large format banners.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-md bg-brand-royal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-brand-navy-900 transition-colors"
            >
              Shop Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/quotes"
              className="inline-flex items-center justify-center rounded-md bg-white/90 px-6 py-3 text-base font-medium text-brand-royal-600 shadow-sm ring-1 ring-inset ring-brand-royal-600/30 hover:bg-white transition-colors backdrop-blur-sm"
            >
              Get a Custom Quote
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
