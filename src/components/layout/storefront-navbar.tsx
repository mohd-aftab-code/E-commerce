import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Menu } from "lucide-react";

export function StorefrontNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu Button */}
        <button className="flex items-center text-gray-900 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/logo.png"
            alt="PS24 Logo"
            width={180}
            height={48}
            className="object-contain"
          />
          <span className="sr-only">
            Print Studio 24
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/products" className="hover:text-brand-royal-600 transition-colors">
            All Products
          </Link>
          <Link href="/business-cards" className="hover:text-brand-royal-600 transition-colors">
            Business Cards
          </Link>
          <Link href="/signs-banners" className="hover:text-brand-royal-600 transition-colors">
            Signs & Banners
          </Link>
          <Link href="/marketing" className="hover:text-brand-royal-600 transition-colors">
            Marketing
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Search Box */}
          <div className="hidden lg:flex items-center relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-64 rounded-full border border-gray-200 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-brand-royal-600 focus:outline-none focus:ring-1 focus:ring-brand-royal-600 transition-colors"
            />
            <button className="absolute right-3 text-gray-400 hover:text-brand-royal-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>

          {/* Account */}
          <Link 
            href="/account"
            className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 text-gray-700 hover:border-brand-royal-600 hover:text-brand-royal-600 transition-all"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Sign In</span>
          </Link>
          
          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center h-10 w-10 rounded-full bg-brand-navy-900 text-white transition-transform hover:scale-105 hover:shadow-md"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-cyan-500 text-[10px] font-bold text-brand-navy-900 shadow-sm border-2 border-white">
              0
            </span>
          </Link>
        </div>
        
      </div>
    </header>
  );
}
