import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PenTool, Layers, CheckCircle, ArrowRight, Sparkles, MonitorSmartphone, Palette, MoveRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Graphic Design Services | Print Studio 24",
  description: "Let our expert in-house design team bring your vision to life. We provide professional graphic design for business cards, banners, apparel, and more.",
};

export default function DesignServicesPage() {
  return (
    <div className="bg-[#fcfdfd] min-h-screen font-sans selection:bg-brand-cyan-200 selection:text-brand-primary-900">
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden border-b border-gray-100">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-brand-cyan-100/40 to-brand-electric-100/20 blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-brand-primary-100/30 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-brand-primary-800 text-xs font-extrabold tracking-widest uppercase mb-8">
                <Sparkles className="w-4 h-4 text-brand-cyan-500" />
                <span>In-House Design Studio</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-6">
                Bring Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-800 to-brand-electric-500">
                  Vision to Life.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
                Don't have a print-ready file? No problem. Our expert graphic designers work directly with you to create stunning, print-perfect visuals that make your brand impossible to ignore.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-brand-primary-900 px-8 py-4 text-base font-bold text-white hover:bg-brand-primary-800 transition-all shadow-xl shadow-brand-primary-900/20 hover:shadow-2xl hover:shadow-brand-primary-900/30 hover:-translate-y-0.5"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#how-it-works" 
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white border-2 border-gray-100 px-8 py-4 text-base font-bold text-gray-700 hover:border-gray-200 hover:bg-gray-50 transition-all"
                >
                  See How It Works
                </a>
              </div>
            </div>

            {/* Right Image Composition */}
            <div className="relative lg:ml-auto w-full max-w-lg lg:max-w-none aspect-square lg:aspect-auto lg:h-[600px]">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-brand-primary-100 to-brand-cyan-50 rotate-3 scale-105" />
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50">
                <Image 
                  src="/theme-images/design-services-hero.jpg" 
                  alt="Professional Design Studio Workspace" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">100% Satisfaction</p>
                  <p className="text-xs text-gray-500">Free digital proofs included</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section id="how-it-works" className="py-24 relative z-10 bg-white">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              More than just printing.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We offer end-to-end creative solutions. Whether you need a simple logo fix or a complete brand overhaul, our studio is equipped to handle it all.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
            {/* Card 1 */}
            <div className="group relative bg-[#f7f9fb] rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-300 hover:bg-brand-primary-900 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 group-hover:bg-brand-cyan-500/20" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-brand-primary-800" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">
                  Custom Artwork
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-brand-primary-100 transition-colors flex-grow">
                  From business cards to large format banners, we design custom artwork tailored specifically to your brand identity and precise printing requirements.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-[#f7f9fb] rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-300 hover:bg-brand-primary-900 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-electric-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 group-hover:bg-brand-electric-500/20" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <MonitorSmartphone className="w-8 h-8 text-brand-primary-800" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">
                  File Preparation
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-brand-primary-100 transition-colors flex-grow">
                  Have a logo but not in the right format? We can vectorize, upscale, and format your existing assets so they print perfectly sharp every single time.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-[#f7f9fb] rounded-3xl p-8 lg:p-10 overflow-hidden transition-all duration-300 hover:bg-brand-primary-900 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 group-hover:bg-brand-cyan-500/20" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-brand-primary-800" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">
                  Digital Proofs
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-brand-primary-100 transition-colors flex-grow">
                  You get the final say. We provide detailed digital proofs for your approval before anything goes to production, ensuring 100% satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brand-primary-900 via-brand-primary-800 to-brand-electric-900 overflow-hidden shadow-2xl">
            {/* Glow effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-cyan-500/20 blur-[100px] rounded-full" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-electric-500/20 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 px-6 py-16 sm:p-20 text-center text-white space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Ready to create <br className="sm:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan-300 to-white">something amazing?</span>
              </h2>
              <p className="text-lg sm:text-xl text-brand-primary-100 leading-relaxed max-w-2xl mx-auto">
                Contact us today to discuss your project. We'll provide a custom quote based on your specific design and printing needs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link 
                  href="/contact" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-10 py-4 text-lg font-extrabold text-brand-primary-900 hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
                >
                  Get a Custom Quote
                  <MoveRight className="w-5 h-5" />
                </Link>
                <a 
                  href="mailto:sales@creativestudio24.us" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 px-10 py-4 text-lg font-bold text-white hover:bg-white/10 transition-all hover:-translate-y-1"
                >
                  Email Us Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
