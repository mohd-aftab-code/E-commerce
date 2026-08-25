import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Printer, Zap, ShieldCheck, Clock } from "lucide-react";
import { HeroSection } from "@/components/layout/hero-section";
import { FeaturedCategories } from "@/components/layout/featured-categories";
import { PromoBanners } from "@/components/layout/promo-banners";
import { PopularProducts } from "@/components/layout/popular-products";
import { LargePromoBanner } from "@/components/layout/large-promo-banner";
import { Interactive3DShowcase } from "@/components/layout/interactive-3d-showcase";
import { Testimonials } from "@/components/layout/testimonials";
import { getPopularProductsByCategory } from "@/features/products/queries";

import { LocalBusinessSchema } from "@/components/seo/local-business-schema";

export const metadata: Metadata = {
  title: "Custom Printing Services Tampa, FL | Print Studio 24 USA",
  description: "Get premium custom business cards, banners, flyers, and apparel in Tampa, FL. We ship nationwide across the USA with fast turnaround times.",
  alternates: { canonical: siteConfig.url },
};

export default async function HomePage() {
  // Fetch popular products for the new section
  const popularCategories = await getPopularProductsByCategory();

  return (
    <>
      <LocalBusinessSchema />
      
      {/* 
        HERO SECTION 
        Animated hero component using Framer Motion and theme images
      */}
      <HeroSection />

      {/* FEATURED CATEGORIES */}
      <FeaturedCategories />

      {/* PROMO BANNERS */}
      <PromoBanners />

      {/* POPULAR PRODUCTS */}
      <PopularProducts categories={popularCategories} />

      {/* LARGE PROMO BANNER */}
      <LargePromoBanner />

      {/* 3D INTERACTIVE SHOWCASE */}
      <Interactive3DShowcase />

      {/* TESTIMONIALS */}
      <Testimonials />

    </>
  );
}
