import Link from "next/link";
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
      <div className="border-b border-gray-100 bg-[#f9f9f9]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-navy-800 transition-colors">Home</Link>
          <FiChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-gray-900 font-medium">All Products</span>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-[#1d3a5f] to-[#2c5f8a] py-14 md:py-20">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block mb-4 bg-brand-cyan-500 text-brand-navy-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Tampa, FL — Since 2024
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Premium Custom Printing
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Business cards, banners, stickers, apparel & more — all with instant online pricing
            and fast turnaround.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="bg-white text-brand-navy-800 font-bold px-7 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm shadow"
            >
              Get a Free Quote
            </Link>
            <a
              href="#products"
              className="border border-white/30 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Browse Products ↓
            </a>
          </div>
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-navy-800 hover:text-brand-navy-800 hover:bg-brand-navy-800/5 transition-all"
                  >
                    {cat.name}
                  </Link>
                ))
              : // Fallback static categories
                quickCategories.map((cat) => (
                  <Link
                    key={cat.slug + cat.name}
                    href={`/categories/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-navy-800 hover:text-brand-navy-800 hover:bg-brand-navy-800/5 transition-all"
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
            <h2 className="text-2xl font-extrabold text-brand-navy-800">
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
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-brand-navy-800 hover:bg-gray-50 transition-all text-left"
                >
                  <span className="text-xl text-gray-600">{cat.icon}</span>
                  <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="bg-brand-navy-800 text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-navy-900 transition-colors text-sm mt-2"
            >
              Contact Us for a Quote
            </Link>
          </div>
        )}
      </div>

      {/* ── CTA Strip ── */}
      <div className="bg-brand-navy-800 py-12 mt-6">
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
            className="bg-brand-cyan-500 text-brand-navy-900 font-bold px-8 py-3 rounded-lg hover:bg-brand-cyan-400 transition-colors text-sm flex-shrink-0"
          >
            Request Custom Quote
          </Link>
        </div>
      </div>

    </div>
  );
}
