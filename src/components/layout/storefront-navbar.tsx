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
            src="/logo/fevicon.png"
            alt="PS24 Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-brand-navy-900">
            Print Studio <span className="text-brand-cyan-500">24</span>
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
        <div className="flex items-center gap-4">
          <Link 
            href="/account"
            className="text-gray-700 hover:text-brand-royal-600 transition-colors hidden sm:flex items-center gap-2 text-sm font-medium"
          >
            <User className="h-5 w-5" />
            <span className="sr-only sm:not-sr-only">Sign In</span>
          </Link>
          
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-brand-navy-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-royal-600"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-cyan-500 text-[10px] font-bold text-brand-navy-900">
              0
            </span>
          </Link>
        </div>
        
      </div>
    </header>
  );
}
