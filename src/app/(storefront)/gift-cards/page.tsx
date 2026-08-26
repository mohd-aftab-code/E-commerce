import type { Metadata } from "next";
import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gift Cards | Print Studio 24",
  description: "Give the gift of custom printing. Digital gift cards coming soon.",
};

export default function GiftCardsPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-xl w-full bg-white rounded-[2.5rem] p-10 sm:p-16 text-center shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary-500 to-brand-cyan-500" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-electric-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-brand-primary-50 rounded-3xl flex items-center justify-center mb-8 rotate-3 hover:-rotate-3 transition-transform">
            <Gift className="w-12 h-12 text-brand-primary-800" />
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Gift Cards
          </h1>
          <div className="inline-block px-4 py-1 rounded-full bg-brand-cyan-100 text-brand-cyan-700 text-sm font-bold tracking-widest uppercase mb-6">
            Coming Soon
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            We're currently working on a new digital gift card experience. Soon, you'll be able to give the perfect gift for any creative project or business need.
          </p>
          
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary-800 px-8 py-4 text-base font-extrabold text-white hover:bg-brand-primary-900 transition-all shadow-md hover:-translate-y-1"
          >
            Return to Homepage
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
