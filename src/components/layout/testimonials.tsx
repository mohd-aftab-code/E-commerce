"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const testimonials = [
  {
    id: 1,
    title: "Great Product",
    body: "Great quality prints and it helped my business stand out at the latest trade show. The business cards are incredible and feel very premium. We have asked our designer before we used it, and he said it is perfect.",
    name: "Adam Stoung",
    role: "Furniture Designer",
  },
  {
    id: 2,
    title: "Great Service",
    body: "Fast shipping and great customer service. We have asked our team before we used it, and it's fine because we are on a tight schedule. We have recommended to our friends and family in United States they have ordered and have been using it.",
    name: "Jessica Young",
    role: "Stylist",
  },
  {
    id: 3,
    title: "Good Quality",
    body: "Good quality product and it helped my wife's business branding on her new store and myself for my agency. We have asked our partner before we used it, and he said it is fine because we are on other marketing campaigns.",
    name: "Anna Marios",
    role: "Model",
  },
  {
    id: 4,
    title: "Exceeded Expectations",
    body: "The custom banners we ordered were stunning! The colors popped and the vinyl was very durable. Even after 3 days at the outdoor festival, they looked brand new. Highly recommend for any event needs.",
    name: "Mark Davis",
    role: "Event Coordinator",
  },
  {
    id: 5,
    title: "Seamless Experience",
    body: "From uploading our artwork to receiving the final printed flyers, the entire process was completely seamless. The customer support team was very responsive when we had a question about bleed margins.",
    name: "Sarah Lin",
    role: "Marketing Director",
  },
  {
    id: 6,
    title: "Incredible Detail",
    body: "As an illustrator, color accuracy and sharpness are my top priorities. Print Studio 24 delivered exactly what was on my screen. The art prints we ordered are selling out fast, thanks to their fantastic print quality.",
    name: "David Chen",
    role: "Freelance Illustrator",
  }
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Scroll by exactly the visible width of the container. 
      // This means on desktop it will scroll 3 items, and on mobile 1 item.
      const scrollAmount = scrollRef.current.clientWidth;
      
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return; // Pause on hover

    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Check if we reached the end
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
          // Scroll back to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(intervalId);
  }, [scroll, isHovered]);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div 
        className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Header */}
        <ScrollReveal direction="up" className="flex items-center justify-between mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-[32px] font-bold text-brand-primary-900 tracking-tight">
            Customers Say About Us
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} className="p-2 text-gray-400 hover:text-brand-primary-900 transition-colors">
              <ArrowLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button onClick={() => scroll('right')} className="p-2 text-gray-400 hover:text-brand-primary-900 transition-colors">
              <ArrowRight className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal direction="up" delay={0.2}>
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 lg:gap-8 snap-x snap-mandatory scrollbar-hide pb-8 lg:pb-0"
          >
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                // Desktop: calc(1/3 of container - gap offset). 2 gaps of 32px (8rem total between 3 items) -> 64px / 3 = 21.33px.
                className="w-[85%] sm:w-[45%] lg:w-[calc(33.333%-21.33px)] flex-shrink-0 snap-start flex flex-col"
              >
                {/* Speech Bubble */}
                <div className="relative bg-[#F4F5F7] rounded-2xl p-8 sm:p-10 mb-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-brand-primary-900 font-bold text-lg mb-3">{t.title}</h3>
                  <p className="text-gray-600 text-[14.5px] leading-relaxed">{t.body}</p>
                  {/* Triangle */}
                  <div className="absolute -bottom-3 left-12 w-8 h-8 bg-[#F4F5F7] rotate-45 transform origin-center rounded-sm"></div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 px-6 mt-auto">
                  <div className="w-14 h-14 rounded-full bg-[#E2E8F0] overflow-hidden flex-shrink-0 flex items-center justify-center text-brand-primary-900 font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-brand-primary-900 font-bold text-[15px]">{t.name}</h4>
                    <p className="text-gray-500 text-[13px] mb-1">{t.role}</p>
                    <div className="flex items-center gap-1 text-[#FFB000]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
