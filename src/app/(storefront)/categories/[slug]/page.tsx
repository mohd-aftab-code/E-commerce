import { notFound } from "next/navigation";
import Link from "next/link";
import { FiChevronRight, FiGrid, FiSliders, FiTag, FiZap, FiCheckCircle, FiPenTool, FiPackage, FiMapPin, FiAward, FiClock } from "react-icons/fi";
import { getCategoryBySlug, getProductsByCategory } from "@/features/shared/products/queries";
import { ProductCard } from "@/features/shared/products/components/product-card";
import type { Metadata } from "next";

// ─── Static data for category hero content ────────────────────────────────────
const categoryMeta: Record<
  string,
  { headline: string; description: string; image: string; badge: string }
> = {
  "business-cards": {
    headline: "Business Cards Printing",
    description:
      "Make a lasting first impression with premium-quality business cards. Choose from hundreds of finishes, paper stocks, and custom shapes — all printed and shipped in Tampa, FL.",
    image: "/images/categories/business-cards.jpg",
    badge: "Free Shipping on 500+",
  },
  marketing: {
    headline: "Marketing Materials",
    description:
      "High-impact flyers, brochures, postcards & leaflets to grow your business. Full color, fast turnaround, starting at quantities as low as 25.",
    image: "/images/categories/marketing.jpg",
    badge: "As Fast as Next Day",
  },
  "signs-banners": {
    headline: "Signs & Banners",
    description:
      "Eye-catching banners, retractable stands, foam board signs, and yard signs. Perfect for events, storefronts, and trade shows.",
    image: "/images/categories/generic.jpg",
    badge: "Weather-Resistant Inks",
  },
  "labels-stickers": {
    headline: "Labels, Stickers & Packaging",
    description:
      "Custom die-cut stickers, roll labels, and retail-ready packaging boxes. Full-color printing on premium materials.",
    image: "/images/categories/generic.jpg",
    badge: "Custom Shapes Available",
  },
  apparel: {
    headline: "Clothing & Apparel",
    description:
      "Custom printed t-shirts, hoodies, polos, and hats for teams, events, and businesses. Screen printing and DTG available.",
    image: "/images/categories/apparel.jpg",
    badge: "No Minimum Orders",
  },
  promotional: {
    headline: "Promotional Products",
    description:
      "Branded tote bags, pens, keychains, lanyards, and more. Perfect for trade shows, corporate gifts, and giveaways.",
    image: "/images/categories/generic.jpg",
    badge: "Bulk Discounts Available",
  },
  drinkware: {
    headline: "Mugs & Drinkware",
    description:
      "Custom printed mugs, tumblers, water bottles, and glassware. Personalize with your logo, photo, or artwork.",
    image: "/images/categories/generic.jpg",
    badge: "Dishwasher Safe Options",
  },
};

const categoryFeatures = [
  { icon: <FiZap />, label: "Fast Turnaround", desc: "As fast as next business day" },
  { icon: <FiCheckCircle />, label: "Quality Guarantee", desc: "100% satisfaction or we reprint" },
  { icon: <FiPenTool />, label: "Free Design Help", desc: "Our team reviews every file" },
  { icon: <FiPackage />, label: "Free Shipping", desc: "On qualifying orders over $75" },
];

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = categoryMeta[slug];
  const category = await getCategoryBySlug(slug);
  const name = category?.name ?? meta?.headline ?? "Category";
  return {
    title: `${name} | Print Studio 24 — Tampa, FL`,
    description:
      meta?.description ??
      `Custom ${name.toLowerCase()} printing in Tampa, FL. Fast turnaround, premium quality.`,
    robots: { index: true, follow: true },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  // Allow page to render even if category isn't in DB yet (uses static meta)
  const meta = categoryMeta[slug];
  if (!category && !meta) notFound();

  const displayName = category?.name ?? meta?.headline ?? slug;
  const heroImage = meta?.image ?? "/theme-images/hero-brochures.jpg";
  const heroBadge = meta?.badge;
  const heroDesc = meta?.description ?? category?.description ?? "";

  return (
    <div className="bg-white min-h-screen">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 bg-[#f9f9f9]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-navy-800 transition-colors">Home</Link>
          <FiChevronRight className="h-4 w-4 flex-shrink-0" />
          <Link href="/products" className="hover:text-brand-navy-800 transition-colors">All Products</Link>
          <FiChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-gray-900 font-medium">{displayName}</span>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-gray-50 min-h-[300px] md:min-h-[400px] border-b border-gray-100 flex items-center">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1a3fcc_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative mx-auto max-w-[1536px] w-full px-4 sm:px-6 lg:px-8 py-14 flex flex-col-reverse lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2 max-w-2xl">
            {heroBadge && (
              <span className="inline-block mb-4 bg-white border border-gray-200 text-brand-primary-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {heroBadge}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-brand-primary-900 leading-[1.1] tracking-tight">
              {displayName}
            </h1>
            {heroDesc && (
              <p className="mt-4 text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
                {heroDesc}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-brand-primary-900 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-brand-primary-800 transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <FiGrid className="h-4 w-4" />
                Browse {displayName}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-sm sm:text-base"
              >
                Get a Custom Quote
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
             <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroImage} alt={displayName} className="w-full h-full object-cover object-center" />
             </div>
          </div>
        </div>
      </div>

      {/* ── Feature Strips ── */}
      <div className="border-b border-gray-100 bg-[#f7f9fb]">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryFeatures.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="text-sm font-bold text-brand-navy-800">{f.label}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Products Section ── */}
      <div id="products" className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-navy-800">
              {products.length > 0
                ? `${products.length} Product${products.length !== 1 ? "s" : ""} Available`
                : displayName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              All prices include free online proofing
            </p>
          </div>
          {products.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <FiSliders className="h-4 w-4" />
              <span>Sort by: <span className="font-semibold text-gray-800">Most Popular</span></span>
            </div>
          )}
        </div>

        {/* Grid or Empty state */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState categoryName={displayName} />
        )}
      </div>

      {/* ── Why Print Studio 24 ── */}
      <div className="bg-[#f7f9fb] border-t border-gray-100 py-14">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-brand-primary-900 mb-8 text-center">
            Why Choose Print Studio 24?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Tampa's #1 Print Shop",
                desc: "Locally owned and operated in Tampa, FL. We know your community and your deadlines.",
                icon: <FiMapPin />,
              },
              {
                title: "Premium Quality Guaranteed",
                desc: "If you're not 100% satisfied with your order, we'll reprint it — no questions asked.",
                icon: <FiAward />,
              },
              {
                title: "Fast Turnaround",
                desc: "Standard 3–5 business days, rush options available. Local pickup also available.",
                icon: <FiClock />,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl text-brand-primary-700">{item.icon}</span>
                <h3 className="font-bold text-brand-primary-900 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <div className="bg-brand-primary-900 py-12">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Need a custom quote?
            </h2>
            <p className="text-white/80 mt-2 text-sm md:text-base">
              Large orders, custom sizes, or special finishes — we'll get you a price fast.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <Link
              href="/contact"
              className="bg-brand-cyan-500 text-brand-primary-900 font-bold px-8 py-3.5 rounded-lg hover:bg-brand-cyan-400 transition-colors text-sm w-full text-center sm:w-auto"
            >
              Request a Quote
            </Link>
            <a
              href="tel:+18133273551"
              className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FiTag className="h-4 w-4" />
              (813) 327-3551
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── Empty state component ────────────────────────────────────────────────────
function EmptyState({ categoryName }: { categoryName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
        <FiGrid className="h-9 w-9 text-gray-300" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">
          Products Coming Soon
        </h3>
        <p className="text-gray-500 mt-2 max-w-sm text-sm leading-relaxed">
          We're adding {categoryName} products to our store. In the meantime, contact us for a custom quote.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/contact"
          className="bg-brand-navy-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-navy-900 transition-colors text-sm"
        >
          Get a Custom Quote
        </Link>
        <Link
          href="/products"
          className="border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
}
