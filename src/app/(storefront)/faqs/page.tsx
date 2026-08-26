import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Package, Palette, RefreshCcw, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center & FAQs | Print Studio 24",
  description: "Find answers to frequently asked questions about ordering, shipping, artwork preparation, and returns at Print Studio 24.",
};

const faqs = [
  {
    category: "Ordering & Production",
    image: "/images/faq-artisan.jpg",
    floatingTitle: "Crafted by artisans",
    floatingDesc: "Every order is carefully handled by our experienced team of print artisans to ensure perfect quality.",
    floatingLink: "/services",
    questions: [
      {
        q: "What is your typical turnaround time?",
        a: "Our standard production turnaround is 3-5 business days after proof approval. We also offer rush production (1-2 days) for an additional fee at checkout."
      },
      {
        q: "Can I cancel or change my order?",
        a: "Because our products are custom-made, orders can only be cancelled or changed before they go into production (usually within 1 hour of proof approval)."
      },
      {
        q: "Do you offer bulk pricing or wholesale discounts?",
        a: "Yes! We specialize in bulk printing for businesses. The discount is automatically applied in your cart as you increase the quantity."
      }
    ]
  },
  {
    category: "Artwork & Design",
    image: "/images/faq-qc.jpg",
    floatingTitle: "Pixel-perfect precision",
    floatingDesc: "Our prepress team inspects and optimizes your files so your final print looks exactly as intended.",
    floatingLink: "/services/design",
    questions: [
      {
        q: "What file formats do you accept?",
        a: "For the best print quality, we recommend uploading vector files (.AI, .EPS, .SVG) or high-resolution .PDF, .PSD, or .TIFF files."
      },
      {
        q: "Will I see a proof before printing?",
        a: "Yes! For all custom orders, our design team will review your file and email you a digital proof for approval before we start printing."
      },
      {
        q: "Do you offer design services?",
        a: "Absolutely. If you don't have print-ready artwork, our expert in-house graphic designers can create custom artwork for you."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    image: "/images/faq-shipping.jpg",
    floatingTitle: "Fast, reliable shipping",
    floatingDesc: "We carefully package your custom prints in premium boxes to ensure they arrive safely and right on schedule.",
    floatingLink: "/shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping usually takes 3-5 business days within the continental US. We also offer expedited 2-day and overnight shipping options at checkout."
      },
      {
        q: "Do you ship internationally?",
        a: "Currently, we only ship within the United States. We are focusing on providing the best possible service and speed to our domestic customers."
      }
    ]
  },
  {
    category: "Returns & Guarantee",
    image: "/images/faq-satisfaction.jpg",
    floatingTitle: "100% Satisfaction",
    floatingDesc: "We stand entirely behind our print quality. When you hand out our materials, we want you to feel incredibly proud.",
    floatingLink: "/policies",
    questions: [
      {
        q: "What is your return policy?",
        a: "Since all our products are custom printed with your artwork, we cannot accept returns for buyer's remorse or spelling/layout errors approved in the proof. However, if there is a manufacturing defect on our end, we will gladly reprint the item."
      },
      {
        q: "What if my package arrives damaged?",
        a: "If your order is damaged in transit, please take a photo of the damaged package and product and contact us within 48 hours of delivery. We will open a claim with the carrier."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* No Hero Section */}

      {/* FAQ Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1470px] space-y-32">

          {faqs.map((category, idx) => {
            const isImageLeft = idx % 2 === 1;

            return (
              <div key={idx} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                {/* Text Side */}
                <div className={`w-full lg:w-1/2 ${isImageLeft ? 'lg:order-2' : ''}`}>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2C3256] mb-8 uppercase tracking-wide">
                    {category.category}
                  </h2>
                  <div className="space-y-0">
                    {category.questions.map((faq, fIdx) => (
                      <details key={fIdx} className="group border-b border-gray-200 [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex items-center justify-between cursor-pointer py-6 font-semibold text-gray-800 hover:text-[#F3552F] transition-colors group-open:text-[#F3552F]">
                          <span className="pr-6 text-lg">{faq.q}</span>
                          <span className="transition-transform duration-300 group-open:-rotate-180 flex-shrink-0 text-gray-400 group-open:text-[#F3552F]">
                            <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                          </span>
                        </summary>
                        <div className="pb-6 text-gray-500 leading-relaxed text-base">
                          <p>{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>

                {/* Image Side */}
                <div className={`w-full lg:w-1/2 relative mt-12 lg:mt-0 ${isImageLeft ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden shadow-sm">
                    <img src={category.image} alt={category.category} className="object-cover w-full h-full" />
                  </div>

                  {/* Floating Box */}
                  <div className={`absolute -bottom-12 ${isImageLeft ? 'right-0 lg:-right-12' : 'left-0 lg:-left-12'} bg-white p-8 sm:p-10 shadow-2xl max-w-[90%] sm:max-w-md border-b-[5px] border-brand-primary-900 z-10`}>
                    <h3 className="text-2xl font-bold text-[#2C3256] mb-4">{category.floatingTitle}</h3>
                    <p className="text-gray-500 mb-8 text-base leading-relaxed">{category.floatingDesc}</p>
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

      {/* Still need help CTA */}
      <section className="py-24 px-4 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-900">Still have questions?</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Our Tampa-based customer support team is available Monday through Friday to help with any inquiries.
          </p>
          <div className="flex justify-center pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-primary-900 px-10 py-5 text-lg font-extrabold text-white hover:bg-brand-primary-800 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
            >
              Contact Support
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
