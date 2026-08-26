"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const panels = [
  {
    id: 0,
    title: "BROCHURES & FLYERS",
    bgColor: "bg-blue-100",
    bgImage: "/theme-images/hero-brochures.jpg",
    badge: "PREMIUM\nPRINTING",
    labelBg: "bg-brand-primary-600",
    href: "/categories/marketing",
  },
  {
    id: 1,
    title: "CUSTOM BUSINESS CARDS",
    bgColor: "bg-brand-primary-900",
    bgImage: "/theme-images/hero-business-cards.jpg",
    badge: "CUSTOM\nDESIGN",
    labelBg: "bg-brand-primary-950",
    href: "/categories/business-cards",
  },
  {
    id: 2,
    title: "CUSTOM APPAREL",
    bgColor: "bg-blue-200",
    bgImage: "/theme-images/hero-tshirts.jpg",
    badge: "BULK\nPRICING",
    labelBg: "bg-brand-primary-700",
    href: "/categories/apparel",
  },
  {
    id: 3,
    title: "LARGE FORMAT & SIGNS",
    bgColor: "bg-blue-50",
    bgImage: "/theme-images/hero-packaging.jpg",
    badge: "FAST\nTURNAROUND",
    labelBg: "bg-brand-primary-800",
    href: "/categories/labels-stickers",
  },
  {
    id: 4,
    title: "IN-HOUSE DESIGN SERVICES",
    bgColor: "bg-blue-100",
    bgImage: "/theme-images/hero-mugs.jpg",
    badge: "EXPERT\nTEAM",
    labelBg: "bg-brand-primary-600",
    href: "/services/design",
  },
];

export function HeroSection() {
  const [activePanel, setActivePanel] = useState(2);

  return (
    <section className="bg-white pt-8 pb-4 sm:pt-12 sm:pb-6 lg:pt-16 lg:pb-8">
      <ScrollReveal direction="up" className="mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-8">

        {/* ── DESKTOP: Accordion Panels ── */}
        <div className="hidden md:flex h-[500px] lg:h-[600px] w-full rounded-xl overflow-hidden shadow-sm border border-gray-100">
          {panels.map((panel, index) => {
            const isActive = activePanel === index;

            return (
              <div
                key={panel.id}
                onMouseEnter={() => setActivePanel(index)}
                className={`relative h-full transition-all duration-500 ease-in-out cursor-pointer ${
                  isActive ? "w-[60%]" : "w-[10%]"
                } ${panel.bgColor}`}
              >
                {/* Background Image */}
                {panel.bgImage && (
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-20"}`}
                    style={{ backgroundImage: `url('${panel.bgImage}')` }}
                  />
                )}

                {/* Vertical Text for Inactive */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-8 left-0 right-0 flex justify-center"
                    >
                      <div className={`${panel.labelBg} px-2 py-6 flex items-center justify-center`}>
                        <span
                          className="block rotate-180 font-bold tracking-widest text-sm whitespace-nowrap"
                          style={{ writingMode: "vertical-rl", color: "#ffffff" }}
                        >
                          {panel.title}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute inset-0 flex flex-col justify-end p-8"
                    >
                      <div className="flex items-end justify-between w-full">
                        <div className={`${panel.labelBg} px-4 py-3 shadow-md`}>
                          <h2
                            className="font-bold text-lg tracking-wider whitespace-nowrap"
                            style={{ color: "#ffffff" }}
                          >
                            {panel.title}
                          </h2>
                        </div>
                        {panel.badge && (
                          <div className="bg-brand-primary-800 text-white font-bold text-center px-5 py-3 shadow-md leading-tight flex flex-col justify-center items-center">
                            <span className="text-2xl">{panel.badge.split("\n")[0]}</span>
                            <span className="text-xs tracking-wider font-semibold">{panel.badge.split("\n")[1]}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── MOBILE: Vertical Tap-to-Expand Accordion ── */}
        <div className="flex flex-col w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 md:hidden">
          {panels.map((panel, index) => {
            const isActive = activePanel === index;
            return (
              <div
                key={panel.id}
                onClick={() => setActivePanel(index)}
                className={`relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
                  isActive ? "h-[220px]" : "h-[52px]"
                } ${panel.bgColor}`}
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-25"
                  }`}
                  style={{ backgroundImage: `url('${panel.bgImage}')` }}
                />

                {/* Gradient overlay — only for active */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                )}

                {/* Collapsed strip label */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center px-4"
                    >
                      <div className={`${panel.labelBg} px-3 py-1.5 rounded`}>
                        <span className="text-white font-bold text-[11px] tracking-wider whitespace-nowrap">
                          {panel.title}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute inset-0 flex flex-col justify-end p-4"
                    >
                      <Link
                        href={panel.href}
                        className="flex items-end justify-between w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className={`${panel.labelBg} px-3 py-2 shadow-md rounded`}>
                          <span className="font-bold text-sm tracking-wider text-white whitespace-nowrap">
                            {panel.title}
                          </span>
                        </div>
                        <div className="bg-brand-primary-800 text-white font-bold text-center px-4 py-2 shadow-md leading-tight flex flex-col justify-center items-center rounded">
                          <span className="text-lg">{panel.badge.split("\n")[0]}</span>
                          <span className="text-[9px] tracking-wider font-semibold">{panel.badge.split("\n")[1]}</span>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </ScrollReveal>
    </section>
  );
}
