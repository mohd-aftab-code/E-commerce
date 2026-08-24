import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Printer, Zap, ShieldCheck, Clock } from "lucide-react";

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
        Clean white background, bold black typography, royal blue CTA.
      */}
      <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex rounded-full bg-brand-cyan-500/10 px-3 py-1 text-sm font-semibold text-brand-royal-600 ring-1 ring-inset ring-brand-royal-600/20">
                Premium Printing in Tampa, FL
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
                Bring Your Brand to <span className="text-gradient-brand">Life</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 mb-8 max-w-xl">
                Professional custom printing services for businesses of all sizes. From high-quality business cards to large format banners, we deliver exceptional results with fast turnaround times.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-md bg-brand-royal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-brand-navy-900 transition-colors"
                >
                  Shop Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/quotes"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-brand-royal-600 shadow-sm ring-1 ring-inset ring-brand-royal-600/30 hover:bg-gray-50 transition-colors"
                >
                  Get a Custom Quote
                </Link>
              </div>
            </div>
            
            {/* Hero Image / Graphic Placeholder */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="aspect-[4/3] rounded-2xl bg-gray-100 p-8 flex items-center justify-center border border-gray-200">
                 {/* Decorative background elements for premium feel */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-cyan-500/20 rounded-full blur-3xl" />
                 <div className="relative text-center z-10">
                    <Printer className="w-20 h-20 mx-auto text-brand-royal-600 mb-4 opacity-50" />
                    <p className="text-sm font-medium text-gray-500">Premium Print Products Showcase</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        FEATURED CATEGORIES (Admin Managed - Using Skeletons for UI planning)
        Light gray background to break sections
      */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Categories
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Browse our most requested printing services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Rendering 4 Skeletons to show how dynamic content will load */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="group relative rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <Skeleton className="h-40 w-full rounded-xl mb-6" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/categories" className="text-sm font-semibold text-brand-royal-600 hover:text-brand-navy-900">
              View all categories <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

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
      <section className="bg-brand-navy-900 py-16 sm:py-24">
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
                className="inline-flex items-center justify-center rounded-md bg-brand-cyan-500 px-6 py-3 text-base font-medium text-brand-navy-900 shadow-sm hover:bg-white transition-colors"
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
