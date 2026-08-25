import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { MoveRight } from "lucide-react";

export function StorefrontFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 text-[#555555]">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Brand & Contact Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-6">
              <Image
                src="/logo/logo.png"
                alt="Print Studio 24"
                width={200}
                height={55}
                className="object-contain w-auto h-12"
              />
            </Link>
            <div className="text-[14px] leading-relaxed mb-4">
              1157 River Drive, Suite 49 Cottonhall,<br />
              CA 8907
            </div>
            <div className="text-[14px] mb-6">
              contact@printstudio24.com
            </div>
            <Link href="/contact" className="inline-flex items-center text-[14px] font-bold text-brand-primary-900 border-b border-brand-primary-900 pb-0.5 hover:text-brand-primary-800 hover:border-brand-primary-800 transition-colors mb-8">
              Get Direction <MoveRight className="ml-2 w-4 h-4" />
            </Link>

            <div className="flex items-center gap-3">
              {/* Social Icons */}
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary-800 text-white flex items-center justify-center hover:bg-brand-primary-900 transition-colors">
                <span className="font-bold text-lg">X</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary-800 text-white flex items-center justify-center hover:bg-brand-primary-900 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary-800 text-white flex items-center justify-center hover:bg-brand-primary-900 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-primary-800 text-white flex items-center justify-center hover:bg-brand-primary-900 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-[17px] font-bold text-brand-primary-900 mb-6">
              Information
            </h3>
            <ul className="space-y-4 text-[14px]">
              <li><Link href="/help" className="hover:text-brand-primary-800 transition-colors">Help Center</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-primary-800 transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-brand-primary-800 transition-colors">Returns</Link></li>
              <li><Link href="/policies" className="hover:text-brand-primary-800 transition-colors">Policies</Link></li>
              <li><Link href="/gift-cards" className="hover:text-brand-primary-800 transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="text-[17px] font-bold text-brand-primary-900 mb-6">
              Service
            </h3>
            <ul className="space-y-4 text-[14px]">
              <li><Link href="/location" className="hover:text-brand-primary-800 transition-colors">Location</Link></li>
              <li><Link href="/contact" className="hover:text-brand-primary-800 transition-colors">Contact Form</Link></li>
              <li><Link href="/support" className="hover:text-brand-primary-800 transition-colors">Support</Link></li>
              <li><Link href="/faqs" className="hover:text-brand-primary-800 transition-colors">FAQs</Link></li>
              <li><Link href="/blog" className="hover:text-brand-primary-800 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1 xl:col-span-1 xl:pl-4">
            <h3 className="text-[17px] font-bold text-brand-primary-900 mb-4">
              Sign Up for Email
            </h3>
            <p className="text-[14px] leading-relaxed mb-6">
              Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!
            </p>
            <div className="flex w-full flex-col sm:flex-row gap-3 mb-8">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full border border-gray-200 px-5 py-2.5 text-[14px] text-gray-900 placeholder-gray-400 focus:border-brand-primary-800 focus:outline-none focus:ring-1 focus:ring-brand-primary-800"
              />
              <button className="whitespace-nowrap rounded-full bg-brand-primary-800 px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-brand-primary-900 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-gray-500">
            Copyright &copy; {new Date().getFullYear()}. Designed By Print Studio 24
          </p>
          <div className="flex gap-2 text-sm text-gray-500">
             {/* Payment Icons */}
             <div className="px-2 w-[46px] h-[28px] bg-white border border-gray-200 rounded flex items-center justify-center">
               <svg viewBox="0 0 38 12" width="28" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path fill="#1434CB" d="M14.07 1L12.72 9.78H10.54L11.89 1H14.07ZM22.72 1C22.33 0.88 21.68 0.74 20.88 0.74 18.74 0.74 17.24 1.87 17.23 3.5C17.21 4.7 17.33 5.34 19.34 6.32 20.74 7 21.21 7.44 21.21 8.12 21.21 9.11 20.01 9.56 18.91 9.56 17.94 9.56 17.41 9.42 16.59 9.06L16.26 8.91 15.95 10.84C16.54 11.11 17.35 11.36 18.24 11.37 20.54 11.37 22.03 10.25 22.04 8.52 22.04 6.96 20.41 6.39 19.82 6.1C18.52 5.45 18.08 5.02 18.08 4.37 18.08 3.79 18.74 3.17 19.85 3.17 20.63 3.15 21.19 3.33 21.55 3.49L21.75 3.58 22.03 1.78ZM32.65 1H30.96C30.45 1 30.06 1.14 29.82 1.67L26.59 9.41H28.88L29.33 8.16H32.13L32.4 9.41H34.42L32.65 1ZM30.83 6.14L31.7 3.76 32.2 6.14H30.83ZM8.22 1L6.04 6.96 5.8 5.76C5.43 4.45 4.25 3.06 2.92 2.36L4.8 9.78H7.08L10.51 1H8.22Z" />
                 <path fill="#F5A623" d="M2.92 2.36H0L0.01 2.45C1.79 2.83 3.06 3.42 4.03 4.08L4.64 0.93C4.73 0.49 4.4 0.17 3.98 0.12L2.92 2.36Z" />
               </svg>
             </div>
             <div className="px-2 w-[46px] h-[28px] bg-white border border-gray-200 rounded flex items-center justify-center">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3 object-contain" />
             </div>
             <div className="px-2 w-[46px] h-[28px] bg-white border border-gray-200 rounded flex items-center justify-center">
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 object-contain" />
             </div>
             <div className="px-2 w-[46px] h-[28px] bg-white border border-gray-200 rounded flex items-center justify-center">
               <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-3 object-contain" />
             </div>
             <div className="px-2 w-[46px] h-[28px] bg-white border border-gray-200 rounded flex items-center justify-center">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-3 object-contain" />
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
