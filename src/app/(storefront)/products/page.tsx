import Link from "next/link";
import Image from "next/image";
import { FiChevronRight, FiGrid } from "react-icons/fi";
import { getProducts, getAllCategories } from "@/features/shared/products/queries";
import { ProductCard } from "@/features/shared/products/components/product-card";
import { FiBriefcase, FiFileText, FiMap, FiTag, FiShoppingBag, FiBox, FiCoffee, FiGift } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | Print Studio 24 — Custom Printing Tampa, FL",
  description:
    "Browse our full catalog of premium custom printing products — business cards, flyers, banners, stickers, apparel, and more. Fast turnaround, free shipping on qualifying orders.",
};

import { ScrollReveal } from "@/components/ui/scroll-reveal";

// ─── Category quick-links data (static, for navigation) ──────────────────────
const quickCategories = [
  { name: "Business Cards", slug: "business-cards", icon: <FiBriefcase /> },
  { name: "Flyers & Leaflets", slug: "marketing", icon: <FiFileText /> },
  { name: "Signs & Banners", slug: "signs-banners", icon: <FiMap /> },
  { name: "Labels & Stickers", slug: "labels-stickers", icon: <FiTag /> },
  { name: "Clothing & Apparel", slug: "apparel", icon: <FiShoppingBag /> },
  { name: "Packaging Boxes", slug: "labels-stickers", icon: <FiBox /> },
  { name: "Mugs & Drinkware", slug: "drinkware", icon: <FiCoffee /> },
  { name: "Promotional", slug: "promotional", icon: <FiGift /> },
];

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getAllCategories(),
  ]);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-primary-800 transition-colors">Home</Link>
          <FiChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-gray-900 font-medium">All Products</span>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div className="relative bg-gray-50 overflow-hidden border-b border-gray-100">
        <div className="mx-auto max-w-[1536px]">
          <div className="relative z-10 pt-14 lg:w-1/2 lg:max-w-2xl pb-14 sm:pb-20 xl:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[500px]">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 mb-6 bg-white border border-gray-200 text-brand-primary-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-cyan-400 animate-pulse" />
                Tampa, FL — Since 2024
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-primary-900 leading-[1.1] tracking-tight">
                Premium Custom <br />
                <span className="text-[#F3552F]">Printing Shop</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                Business cards, banners, stickers, apparel & more — all with instant online pricing
                and fast turnaround. Designed and printed with care.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="bg-brand-primary-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-brand-primary-800 transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm sm:text-base flex items-center gap-2"
                >
                  Get a Free Quote <FiChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="#products"
                  className="bg-white border border-gray-200 text-gray-700 font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors text-sm sm:text-base flex items-center gap-2 shadow-sm"
                >
                  Browse Products <FiGrid className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Right side image on desktop, background on mobile */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 opacity-10 lg:opacity-100 mix-blend-multiply lg:mix-blend-normal">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent z-10 hidden lg:block w-32" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent z-10 lg:hidden" />
          <Image
            src="/images/products-hero.jpg"
            alt="Print Studio 24 Workshop"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* ── Category Quick Links ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <FiGrid className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Browse by Category
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* DB categories first (if any) */}
            {categories.length > 0
              ? categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-primary-800 hover:text-brand-primary-800 hover:bg-brand-primary-800/5 transition-all"
                  >
                    {cat.name}
                  </Link>
                ))
              : // Fallback static categories
                quickCategories.map((cat) => (
                  <Link
                    key={cat.slug + cat.name}
                    href={`/categories/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-primary-800 hover:text-brand-primary-800 hover:bg-brand-primary-800/5 transition-all"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
          </div>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div id="products" className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-primary-800">
              {products.length > 0
                ? `All Products (${products.length})`
                : "Our Products"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Free online proofing included on every order
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                badge={idx === 0 ? "Best Seller" : idx === 1 ? "New" : undefined}
              />
            ))}
          </div>
        ) : (
          // Empty state — when DB has no products yet
          <div className="py-24 flex flex-col items-center gap-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center">
              <FiGrid className="h-9 w-9 text-gray-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Products Coming Soon</h3>
              <p className="mt-2 text-gray-500 text-sm max-w-sm">
                We're loading our catalog. In the meantime, contact us for a custom quote on any printing project.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
              {quickCategories.map((cat) => (
                <Link
                  key={cat.slug + cat.name}
                  href={`/categories/${cat.slug}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-brand-primary-800 hover:bg-gray-50 transition-all text-left"
                >
                  <span className="text-xl text-gray-600">{cat.icon}</span>
                  <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="bg-brand-primary-800 text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-primary-900 transition-colors text-sm mt-2"
            >
              Contact Us for a Quote
            </Link>
          </div>
        )}
      </div>

      {/* ── CTA Strip ── */}
      <div className="bg-brand-primary-800 py-12 mt-6">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Don't see what you need?
            </h2>
            <p className="text-white/70 mt-1 text-sm">
              We print almost anything. Get in touch for a custom quote.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-brand-cyan-500 text-brand-primary-900 font-bold px-8 py-3 rounded-lg hover:bg-brand-cyan-400 transition-colors text-sm flex-shrink-0"
          >
            Request Custom Quote
          </Link>
        </div>
      </div>

    </div>
  );
}
