import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies & Terms | Print Studio 24",
  description: "Read our shipping policy, return policy, privacy policy, and terms of service.",
};

export default function PoliciesPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Header */}
      <section className="bg-brand-primary-900 text-white py-16 px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Legal & Policies</h1>
          <p className="text-brand-primary-100 max-w-2xl mx-auto text-lg">
            Everything you need to know about how we operate, ship, and protect your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Sidebar Navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="sticky top-28 bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Jump to section</h3>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#shipping" className="text-gray-600 hover:text-brand-primary-800 transition-colors block">Shipping Policy</a></li>
                <li><a href="#returns" className="text-gray-600 hover:text-brand-primary-800 transition-colors block">Return Policy</a></li>
                <li><a href="#privacy" className="text-gray-600 hover:text-brand-primary-800 transition-colors block">Privacy Policy</a></li>
                <li><a href="#terms" className="text-gray-600 hover:text-brand-primary-800 transition-colors block">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Policy Text */}
          <div className="flex-1 prose prose-lg prose-headings:text-brand-primary-900 prose-a:text-brand-primary-600 max-w-none">
            
            <div id="shipping" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold mb-6">Shipping Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">We strive to deliver your custom printed materials as quickly as possible. Production time does not include shipping time.</p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Turnaround Times</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong>Standard Production:</strong> 3-5 business days after proof approval.</li>
                <li><strong>Rush Production:</strong> 1-2 business days (available at checkout).</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Shipping Options (US Only)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">All packages are shipped from our Tampa, FL facility. We offer Standard (3-5 days), Expedited (2 days), and Overnight shipping.</p>
              <p className="text-gray-600 leading-relaxed bg-brand-primary-50 p-4 rounded-xl text-sm border border-brand-primary-100">
                <strong>Note:</strong> We are not responsible for delays caused by weather, carrier issues, or incorrect address information provided during checkout.
              </p>
            </div>

            <div className="w-full h-px bg-gray-200 my-16" />

            <div id="returns" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold mb-6">Return & Refund Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Because Print Studio 24 products are custom printed with your specific artwork, we cannot accept returns or offer refunds for customer-caused errors or buyer's remorse.</p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">What is NOT covered:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Spelling, grammatical, or layout errors approved in the digital proof.</li>
                <li>Low-resolution images uploaded by the customer resulting in poor print quality.</li>
                <li>Wrong size or product ordered by the customer.</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-8 mb-4">What IS covered (Our Guarantee):</h3>
              <p className="text-gray-600 leading-relaxed mb-4">If your order arrives damaged, defective, or there is a clear manufacturing error on our part (e.g., printed on the wrong material, colors vastly different from the CMYK proof), please contact us within <strong>48 hours of delivery</strong>.</p>
              <p className="text-gray-600 leading-relaxed">We will gladly reprint the defective items at no cost to you or issue a store credit.</p>
            </div>

            <div className="w-full h-px bg-gray-200 my-16" />

            <div id="privacy" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Your privacy is important to us. Print Studio 24 collects personal information such as your name, email address, shipping address, and payment information solely for the purpose of fulfilling your order and providing customer support.</p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Data Security</h3>
              <p className="text-gray-600 leading-relaxed mb-4">We use industry-standard encryption (SSL) to protect your data during checkout. Your payment information is processed securely by our payment gateway (Stripe) and is never stored on our servers.</p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Third-Party Sharing</h3>
              <p className="text-gray-600 leading-relaxed">We do not sell, trade, or rent your personal information to third parties. We only share necessary information with our shipping carriers to deliver your order.</p>
            </div>

            <div className="w-full h-px bg-gray-200 my-16" />

            <div id="terms" className="scroll-mt-32 mb-16">
              <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
              <p className="text-gray-600 leading-relaxed mb-4">By using the Print Studio 24 website and placing an order, you agree to the following terms:</p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Content Ownership & Liability</h3>
              <p className="text-gray-600 leading-relaxed mb-4">You guarantee that you own the rights to the artwork you upload, or that you have obtained the necessary permissions to reproduce it. Print Studio 24 reserves the right to refuse printing any material that we deem illegal, offensive, or in violation of intellectual property laws.</p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Color Matching</h3>
              <p className="text-gray-600 leading-relaxed">While we use calibrated commercial printers, colors on a computer monitor (RGB) will inherently look slightly different than printed ink (CMYK). We cannot guarantee an exact 100% color match to your screen.</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
