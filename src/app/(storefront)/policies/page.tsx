import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies & Terms | Print Studio 24",
  description: "Read our shipping policy, return policy, privacy policy, and terms of service.",
};

export default function PoliciesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* No Hero Section */}

      {/* Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1470px] flex flex-col md:flex-row gap-12 lg:gap-24">

          {/* Sidebar Navigation */}
          <div className="md:w-72 flex-shrink-0">
            <div className="sticky top-32 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-extrabold text-[#2C3256] mb-6 uppercase tracking-widest text-xs">Jump to section</h3>
              <ul className="space-y-4 text-sm font-semibold">
                <li><a href="#shipping" className="text-gray-500 hover:text-[#F3552F] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#F3552F]"></span>Shipping Policy</a></li>
                <li><a href="#returns" className="text-gray-500 hover:text-[#F3552F] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#F3552F]"></span>Return Policy</a></li>
                <li><a href="#privacy" className="text-gray-500 hover:text-[#F3552F] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#F3552F]"></span>Privacy Policy</a></li>
                <li><a href="#terms" className="text-gray-500 hover:text-[#F3552F] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#F3552F]"></span>Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Policy Text */}
          <div className="flex-1 bg-white p-8 md:p-12 lg:p-16 rounded-3xl shadow-sm border border-gray-100">

            <div id="shipping" className="scroll-mt-32 mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-1 bg-[#F3552F] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C3256] tracking-tight">Shipping Policy</h2>
              </div>
              <div className="space-y-5 text-gray-600 text-base leading-relaxed">
                <p>We strive to deliver your custom printed materials as quickly as possible. Please note that production time does not include shipping time.</p>

                <h3 className="text-lg md:text-xl font-bold text-[#2C3256] mt-8 mb-3">Turnaround Times</h3>
                <ul className="list-disc pl-6 space-y-2 marker:text-[#F3552F]">
                  <li><strong className="text-gray-900 font-semibold">Standard Production:</strong> 3-5 business days after proof approval.</li>
                  <li><strong className="text-gray-900 font-semibold">Rush Production:</strong> 1-2 business days (available at checkout for an additional fee).</li>
                </ul>

                <h3 className="text-lg md:text-xl font-bold text-[#2C3256] mt-8 mb-3">Shipping Options (US Only)</h3>
                <p>All packages are carefully boxed and shipped directly from our Tampa, FL production facility. We offer Standard (3-5 days), Expedited (2 days), and Overnight shipping.</p>

                <div className="mt-6 bg-orange-50 border-l-4 border-[#F3552F] p-5 rounded-r-xl">
                  <p className="text-orange-900 text-sm m-0">
                    <strong className="font-bold">Important Note:</strong> We are not responsible for delays caused by extreme weather, carrier operational issues, or incorrect address information provided during checkout.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12" />

            <div id="returns" className="scroll-mt-32 mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-1 bg-[#F3552F] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C3256] tracking-tight">Return & Refund Policy</h2>
              </div>
              <div className="space-y-5 text-gray-600 text-base leading-relaxed">
                <p>Because Print Studio 24 products are 100% custom printed with your specific artwork, we cannot accept returns, exchanges, or offer refunds for customer-caused errors or buyer's remorse.</p>

                <h3 className="text-lg md:text-xl font-bold text-[#2C3256] mt-8 mb-3">What is NOT covered:</h3>
                <ul className="list-disc pl-6 space-y-2 marker:text-gray-400">
                  <li>Spelling, grammatical, or layout errors that were approved by you in the digital proof.</li>
                  <li>Low-resolution or pixelated images uploaded by the customer resulting in poor print quality.</li>
                  <li>Wrong size or incorrect product variant ordered by the customer.</li>
                </ul>

                <h3 className="text-lg md:text-xl font-bold text-[#2C3256] mt-8 mb-3">What IS covered (Our Guarantee):</h3>
                <p>If your order arrives damaged, defective, or there is a clear manufacturing error on our part (e.g., printed on the completely wrong material, colors vastly different from the CMYK proof), please contact us within <strong className="text-gray-900 font-semibold">48 hours of delivery</strong>.</p>
                <p className="font-medium text-gray-900 bg-gray-50 py-3 px-5 rounded-xl border border-gray-100 inline-block mt-1">
                  We will gladly reprint the defective items at absolutely no cost to you.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12" />

            <div id="privacy" className="scroll-mt-32 mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-1 bg-[#F3552F] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C3256] tracking-tight">Privacy Policy</h2>
              </div>
              <div className="space-y-5 text-gray-600 text-base leading-relaxed">
                <p>Your privacy and the security of your designs are paramount to us. Print Studio 24 collects personal information such as your name, email address, shipping address, and payment information solely for the purpose of fulfilling your order and providing customer support.</p>

                <h3 className="text-lg md:text-xl font-bold text-[#2C3256] mt-8 mb-3">Data Security</h3>
                <p>We use industry-standard encryption (SSL) to protect your data during checkout. Your payment information is processed securely by our certified payment gateway (Stripe) and is never stored directly on our servers.</p>

                <h3 className="text-lg md:text-xl font-bold text-[#2C3256] mt-8 mb-3">Third-Party Sharing</h3>
                <p>We absolutely <strong className="text-gray-900 font-semibold">do not</strong> sell, trade, or rent your personal information to third parties. We only share necessary information with our trusted shipping carriers to deliver your order.</p>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12" />

            <div id="terms" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-1 bg-[#F3552F] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C3256] tracking-tight">Terms of Service</h2>
              </div>
              <div className="space-y-5 text-gray-600 text-base leading-relaxed">
                <p>By using the Print Studio 24 website and placing an order, you agree to the following legally binding terms:</p>

                <h3 className="text-lg md:text-xl font-bold text-[#2C3256] mt-8 mb-3">Content Ownership & Liability</h3>
                <p>You guarantee that you own the rights to the artwork you upload, or that you have obtained the necessary legal permissions to reproduce it. Print Studio 24 reserves the right to refuse printing any material that we deem illegal, highly offensive, or in direct violation of intellectual property laws.</p>

                <h3 className="text-lg md:text-xl font-bold text-[#2C3256] mt-8 mb-3">Color Matching</h3>
                <p>While we use highly calibrated commercial printers, colors viewed on a backlit computer monitor (RGB) will inherently look slightly different than physical printed ink (CMYK). We cannot guarantee an exact 100% color match to your screen, but we ensure industry-standard color fidelity.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
