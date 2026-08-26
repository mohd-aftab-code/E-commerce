import type { Metadata } from "next";
import Link from "next/link";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Blog | Print Studio 24",
};

export default function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-[80vh] relative overflow-hidden flex items-center">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-32 -mr-32 w-[600px] h-[600px] bg-brand-primary-100 rounded-full blur-[140px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-[700px] h-[700px] bg-brand-cyan-100/50 rounded-full blur-[160px] opacity-70 pointer-events-none" />

      <div className="relative mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        
        <div className="mx-auto h-24 w-24 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-300">
          <FiBookOpen className="h-10 w-10 text-brand-primary-800" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2C3256] tracking-tight mb-6">
          The Print Studio 24 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-600 to-brand-cyan-600">Blog</span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          We're currently crafting expert guides, printing tips, and design inspiration for our new blog. Check back soon for amazing content!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="rounded-xl bg-brand-primary-900 px-8 py-4 text-white font-extrabold text-lg hover:bg-brand-primary-800 transition-all shadow-md hover:shadow-xl inline-flex items-center gap-2"
          >
            Explore Products <FiArrowRight />
          </Link>
          <Link
            href="/contact"
            className="rounded-xl bg-white border-2 border-gray-200 px-8 py-4 text-gray-700 font-extrabold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
}
