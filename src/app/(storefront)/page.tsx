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
import { Testimonials } from "@/components/layout/testimonials";
import { getPopularProductsByCategory } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "Custom Printing Services Tampa, FL",
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default async function HomePage() {
  // Fetch popular products for the new section
  const popularCategories = await getPopularProductsByCategory();

  return (
    <>
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

      {/* TESTIMONIALS */}
      <Testimonials />

    </>
  );
}
