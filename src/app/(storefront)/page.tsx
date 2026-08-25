import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Printer, Zap, ShieldCheck, Clock } from "lucide-react";
import { HeroSection } from "@/components/layout/hero-section";
import { FeaturedCategories } from "@/components/layout/featured-categories";
import { PromoBanners } from "@/components/layout/promo-banners";

export const metadata: Metadata = {
  title: "Custom Printing Services Tampa, FL",
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
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

      {/* 
        VALUE PROPOSITIONS
      */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 text-center">
            <div>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyan-500/10">
                <Zap className="h-8 w-8 text-brand-royal-600" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900">Fast Turnaround</h3>
              <p className="text-sm text-gray-600">Need it yesterday? We offer expedited printing options for when time is of the essence.</p>
            </div>
            <div>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyan-500/10">
                <ShieldCheck className="h-8 w-8 text-brand-royal-600" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900">Premium Quality</h3>
              <p className="text-sm text-gray-600">We use state-of-the-art equipment and premium materials for a flawless finish.</p>
            </div>
            <div>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyan-500/10">
                <Clock className="h-8 w-8 text-brand-royal-600" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600">Our team is always ready to assist you with artwork setup, quotes, or tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        CTA SECTION
      */}
      <section className="bg-brand-primary-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-3xl bg-white/10 p-8 md:p-12 border border-white/20 backdrop-blur-sm">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Ready to start your print project?
              </h2>
              <p className="text-lg text-brand-cyan-300/80">
                Create an account today to access custom pricing, manage artwork, and reorder with one click.
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-brand-cyan-500 px-6 py-3 text-base font-medium text-brand-primary-900 shadow-sm hover:bg-white transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
