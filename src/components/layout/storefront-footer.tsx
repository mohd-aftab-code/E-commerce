import Link from "next/link";
import { siteConfig } from "@/config/site";

export function StorefrontFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-brand-navy-900 mb-4 block">
              Print Studio <span className="text-brand-cyan-500">24</span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">
              Premium custom printing services in Tampa, Florida. Business cards, banners, signs, and more.
            </p>
            <p className="text-sm font-semibold text-brand-navy-900">
              100% Quality Guarantee
            </p>
          </div>

          {/* Links - Shop */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/business-cards" className="hover:text-brand-royal-600">Business Cards</Link></li>
              <li><Link href="/marketing" className="hover:text-brand-royal-600">Marketing Materials</Link></li>
              <li><Link href="/signs-banners" className="hover:text-brand-royal-600">Signs & Banners</Link></li>
              <li><Link href="/apparel" className="hover:text-brand-royal-600">Apparel</Link></li>
            </ul>
          </div>

          {/* Links - Company */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-brand-royal-600">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-royal-600">Contact & Support</Link></li>
              <li><Link href="/faq" className="hover:text-brand-royal-600">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-royal-600">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Tampa, FL, USA<br />
              support@printstudio24.com
            </p>
            <div className="flex w-full rounded-md shadow-sm">
              <input
                type="email"
                placeholder="Email address"
                className="w-full min-w-0 flex-1 rounded-none rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-royal-600 focus:outline-none focus:ring-1 focus:ring-brand-royal-600"
              />
              <button className="flex-none rounded-r-md bg-brand-royal-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy-900 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>
        
        <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
