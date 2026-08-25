"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const panels = [
  {
    id: 0,
    title: "BROCHURES & FLYERS",
    bgColor: "bg-[#d3c5f2]", // Light purple
    bgImage: "/theme-images/2024/02/slider-home5-2.jpg",
    badge: "5K+\nTEMPLATE",
    labelBg: "bg-[#88789d]",
  },
  {
    id: 1,
    title: "BUSINESS CARD",
    bgColor: "bg-[#f5dd90]", // Yellow-ish
    bgImage: "/theme-images/2024/02/cate-home5-2.jpg",
    badge: "8K+\nTEMPLATE",
    labelBg: "bg-[#8f8051]",
  },
  {
    id: 2,
    title: "T-SHIRTS DESIGN",
    bgColor: "bg-[#2b2b2b]", // Dark
    bgImage: "/theme-images/2023/12/image-61.jpg",
    badge: "12K+\nTEMPLATE",
    labelBg: "bg-[#1a1a1a]",
  },
  {
    id: 3,
    title: "PACKAGING BOX",
    bgColor: "bg-[#e2e1d7]", // Light gray
    bgImage: "/theme-images/2024/02/cate-home5-4.jpg",
    badge: "18K+\nTEMPLATE",
    labelBg: "bg-[#868680]",
  },
  {
    id: 4,
    title: "CUP & MUG DESIGN",
    bgColor: "bg-[#f5c65a]", // Deeper yellow
    bgImage: "/theme-images/2024/02/cate-home5-5.jpg",
    badge: "10K+\nTEMPLATE",
    labelBg: "bg-[#96824a]",
  }
];

export function HeroSection() {
  const [activePanel, setActivePanel] = useState(0);

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[600px] w-full rounded-xl overflow-hidden shadow-sm border border-gray-100">
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
                {/* Background Image (faded or clear depending on if it's active) */}
                {panel.bgImage && (
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-20'}`}
                    style={{ backgroundImage: `url('${panel.bgImage}')` }}
                  />
                )}

                {/* Vertical Text for Inactive State */}
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
                          style={{ writingMode: 'vertical-rl', color: '#ffffff' }}
                        >
                          {panel.title}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Content for Active State */}
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
                        {/* Horizontal Label */}
                        <div className={`${panel.labelBg} px-4 py-3 shadow-md`}>
                          <h2 
                            className="font-bold text-lg tracking-wider whitespace-nowrap"
                            style={{ color: '#ffffff' }}
                          >
                            {panel.title}
                          </h2>
                        </div>

                        
                        {/* Right Badge */}
                        {panel.badge && (
                          <div className="bg-[#383733] text-white font-bold text-center px-5 py-3 shadow-md leading-tight flex flex-col justify-center items-center">
                            <span className="text-2xl">{panel.badge.split('\n')[0]}</span>
                            <span className="text-xs tracking-wider font-semibold">{panel.badge.split('\n')[1]}</span>
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
      </div>
    </section>
  );
}
