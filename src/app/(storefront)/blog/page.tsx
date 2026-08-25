import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Blog | Print Studio 24",
};

export default function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl font-extrabold text-brand-navy-900 sm:text-5xl tracking-tight mb-4">
            Print Studio 24 Blog
          </h1>
          <p className="text-lg text-gray-500">
            Insights, tips, and inspiration for your next printing project. Coming soon!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto">
          <div className="mx-auto h-16 w-16 bg-brand-cyan-50 rounded-full flex items-center justify-center mb-6">
            <FiBookOpen className="h-8 w-8 text-brand-primary-800" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">We're writing our first posts</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Our team is busy putting together great guides on print design, material selection, and marketing strategies for Tampa businesses. Check back soon!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-brand-navy-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-royal-600 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-gray-200 bg-white text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors gap-2"
            >
              Contact Us <FiArrowRight />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
