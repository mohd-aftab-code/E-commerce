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
    icon: <HelpCircle className="w-6 h-6" />,
    questions: [
      {
        q: "What is your typical turnaround time?",
        a: "Our standard production turnaround is 3-5 business days after proof approval. We also offer rush production (1-2 days) for an additional fee at checkout."
      },
      {
        q: "Can I cancel or change my order?",
        a: "Because our products are custom-made, orders can only be cancelled or changed before they go into production (usually within 1 hour of proof approval). Please contact us immediately if you need to make a change."
      },
      {
        q: "Do you offer bulk pricing or wholesale discounts?",
        a: "Yes! We specialize in bulk printing for businesses. The discount is automatically applied in your cart as you increase the quantity. For extremely large orders, please request a custom quote."
      }
    ]
  },
  {
    category: "Artwork & Design",
    icon: <Palette className="w-6 h-6" />,
    questions: [
      {
        q: "What file formats do you accept?",
        a: "For the best print quality, we recommend uploading vector files (.AI, .EPS, .SVG) or high-resolution .PDF, .PSD, or .TIFF files. We also accept .JPG and .PNG, but please ensure they are at least 300 DPI at the final print size."
      },
      {
        q: "Will I see a proof before printing?",
        a: "Yes! For all custom orders, our design team will review your file and email you a digital proof for approval before we start printing. Production does not begin until you approve the proof."
      },
      {
        q: "Do you offer design services?",
        a: "Absolutely. If you don't have print-ready artwork, our expert in-house graphic designers can create custom artwork for you starting at a very affordable rate."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    icon: <Package className="w-6 h-6" />,
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
    category: "Returns & Quality Guarantee",
    icon: <RefreshCcw className="w-6 h-6" />,
    questions: [
      {
        q: "What is your return policy?",
        a: "Since all our products are custom printed with your artwork, we cannot accept returns for buyer's remorse or spelling/layout errors approved in the proof. However, if there is a manufacturing defect or printing error on our end, we will gladly reprint the item at no cost to you."
      },
      {
        q: "What if my package arrives damaged?",
        a: "If your order is damaged in transit, please take a photo of the damaged package and product and contact us within 48 hours of delivery. We will open a claim with the carrier and rush a reprint to you immediately."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-brand-primary-900 text-white py-20 px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">How can we help?</h1>
          <p className="text-lg md:text-xl text-brand-primary-100 max-w-2xl mx-auto">
            Browse our most frequently asked questions below. Can't find what you're looking for? Our team is always here to assist you.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl space-y-16">
          
          {faqs.map((category, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-brand-primary-50 rounded-2xl flex items-center justify-center text-brand-primary-800">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((faq, fIdx) => (
                  <details key={fIdx} className="group border border-gray-200 rounded-xl bg-gray-50/50 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-gray-900 hover:bg-gray-50 transition-colors">
                      <span className="pr-6">{faq.q}</span>
                      <span className="transition-transform duration-300 group-open:-rotate-180 flex-shrink-0 text-brand-primary-800">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Still need help CTA */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Still have questions?</h2>
          <p className="text-gray-600 text-lg">
            Our Tampa-based customer support team is available Monday through Friday to help with any inquiries.
          </p>
          <div className="flex justify-center pt-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary-800 px-8 py-4 text-base font-extrabold text-white hover:bg-brand-primary-900 transition-all shadow-md hover:-translate-y-1"
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
