import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Graphic Design Services | Print Studio 24",
  description: "Let our expert in-house design team bring your vision to life. We provide professional graphic design for business cards, banners, apparel, and more.",
};

const services = [
  {
    title: "Custom Design Solutions",
    image: "/theme-images/design-services-hero.jpg",
    content: "Need a complete brand overhaul or a striking new marketing campaign? Our in-house creative directors develop custom design solutions tailored specifically to your business goals. We don't just make it look good; we make it work for your brand.",
    floatingTitle: "Tailored for You",
    floatingDesc: "Strategic design that drives real business results.",
  },
  {
    title: "Brand Identity & Logos",
    image: "/theme-images/faq-artwork.jpg",
    content: "Your logo is the face of your business. We craft modern, memorable brand identities and vector graphics that look perfect across all mediums—from tiny business cards to massive storefront banners.",
    floatingTitle: "Stand Out",
    floatingDesc: "Memorable branding crafted by expert graphic designers.",
  },
  {
    title: "File Preparation",
    image: "/theme-images/design-file-prep.jpg",
    content: "Have a logo but not in the right format? Blurry images? We can vectorize, upscale, and format your existing assets so they print perfectly sharp every single time. We fix color spaces, bleeds, and margins so you don't have to.",
    floatingTitle: "Pixel Perfect",
    floatingDesc: "We ensure your files are 100% print-ready before they ever hit the press.",
  },
  {
    title: "Print-Ready Optimization",
    image: "/theme-images/faq-ordering.jpg",
    content: "Designing for screen is very different from designing for print. Our prepress artisans review every file, optimizing CMYK color values, ensuring proper ink coverage, and verifying safe zones so your final product is flawless.",
    floatingTitle: "Prepress Mastery",
    floatingDesc: "Bridging the gap between digital design and physical print.",
  },
  {
    title: "Packaging & Box Design",
    image: "/theme-images/faq-shipping.jpg",
    content: "Make unboxing an unforgettable experience. We design custom mailers, premium shipping boxes, and product packaging that elevates your brand and keeps your products secure during transit.",
    floatingTitle: "Unboxing Experience",
    floatingDesc: "Premium packaging design that wows your customers.",
  },
  {
    title: "Digital Proofs & Color Matching",
    image: "/theme-images/design-proofs.jpg",
    content: "You get the final say. We provide detailed digital proofs and perform rigorous color matching to guarantee that the colors you see on screen are faithfully reproduced on paper. What you see is exactly what you get.",
    floatingTitle: "100% Satisfaction",
    floatingDesc: "Review, tweak, and approve your designs before we start printing.",
  },
  {
    title: "Premium Finishes & Materials",
    image: "/theme-images/faq-guarantee.jpg",
    content: "Take your prints to the next level. We specifically design artwork to utilize premium finishes like gold foil stamping, spot UV gloss, embossing, and die-cutting, ensuring every detail pops perfectly.",
    floatingTitle: "The Extra Mile",
    floatingDesc: "Designing for specialty finishes that demand attention.",
  }
];

export default function DesignServicesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* ── SERVICES CONTENT (Using the old FAQ layout) ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1470px] space-y-32">

          {services.map((service, idx) => {
            const isImageLeft = idx % 2 === 1;

            return (
              <div key={idx} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                {/* Text Side */}
                <div className={`w-full lg:w-1/2 ${isImageLeft ? 'lg:order-2' : ''}`}>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2C3256] mb-8 uppercase tracking-wide">
                    {service.title}
                  </h2>
                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {service.content}
                    </p>
                  </div>
                </div>

                {/* Image Side */}
                <div className={`w-full lg:w-1/2 relative mt-12 lg:mt-0 ${isImageLeft ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm bg-gray-100">
                    <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
                  </div>

                  {/* Floating Box */}
                  <div className={`absolute -bottom-12 ${isImageLeft ? 'right-0 lg:-right-12' : 'left-0 lg:-left-12'} bg-white p-8 sm:p-10 shadow-2xl max-w-[90%] sm:max-w-md border-b-[5px] border-[#2C3256] z-10`}>
                    <h3 className="text-2xl font-bold text-[#2C3256] mb-4">{service.floatingTitle}</h3>
                    <p className="text-gray-500 mb-8 text-base leading-relaxed">{service.floatingDesc}</p>
                    <div className="flex items-center gap-2 opacity-80">
                      <div className="w-10 h-[3px] bg-[#F3552F] rounded-full"></div>
                      <div className="w-2 h-[3px] bg-[#F3552F]/60 rounded-full"></div>
                      <div className="w-1 h-[3px] bg-[#F3552F]/30 rounded-full"></div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-900">Ready to create something amazing?</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Contact us today to discuss your project. We'll provide a custom quote based on your specific design and printing needs.
          </p>
          <div className="flex justify-center pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary-900 px-10 py-5 text-lg font-extrabold text-white hover:bg-brand-primary-800 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
            >
              Get a Custom Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
