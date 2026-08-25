"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Heart, Menu, MapPin, Search, ChevronDown } from "lucide-react";

export function StorefrontNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full bg-white flex flex-col transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"}`}>
      
      {/* Collapsible Top Section */}
      <div className={`w-full grid transition-all duration-500 ease-in-out ${isScrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}>
        <div className="overflow-hidden flex flex-col w-full">
          {/* Tier 1: Top Bar */}
        <div className="bg-[#f7f7f7] text-[#555555] text-[13px] border-b border-gray-100 hidden lg:block">
        <div className="mx-auto flex h-10 max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Links */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-brand-royal-600 transition-colors">Contact</Link>
            <Link href="/blog" className="hover:text-brand-royal-600 transition-colors">Blog</Link>
            <Link href="/order-tracking" className="hover:text-brand-royal-600 transition-colors">Order Tracking</Link>
          </div>
          
          {/* Center Promo */}
          <div className="flex items-center">
            <span>Spring Sale. Sweet Crunchy Salad.</span>
            <Link href="/sale" className="ml-2 font-semibold hover:text-brand-royal-600 underline decoration-gray-300 underline-offset-4 flex items-center">
              Read More
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
          
          {/* Right Settings */}
          <div className="flex items-center gap-5">
            <Link href="/stores" className="flex items-center gap-1.5 hover:text-brand-royal-600 transition-colors">
              <MapPin className="h-4 w-4" />
              Store near me
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-brand-royal-600">
              USD
              <ChevronDown className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-brand-royal-600">
              <div className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center border border-gray-200 bg-blue-100">
                {/* Flag placeholder */}
                <div className="w-full h-1/3 bg-red-600"></div>
                <div className="w-full h-1/3 bg-white"></div>
                <div className="w-full h-1/3 bg-blue-600"></div>
              </div>
              English
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Navbar (Logo, Search, Icons) */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex h-24 max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8">
          
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
              width={160}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Center Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-12">
            <div className="flex w-full items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden h-[50px] focus-within:border-brand-navy-800 focus-within:ring-1 focus-within:ring-brand-navy-800 transition-all">
              <div className="flex items-center pl-4 pr-3 border-r border-gray-200 cursor-pointer text-sm font-medium text-gray-700 min-w-max hover:text-brand-navy-800">
                All categories
                <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Enter key to search..." 
                className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-800"
              />
              <button className="flex h-full w-12 items-center justify-center text-gray-400 hover:text-brand-navy-800">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5 text-gray-600">
            <Link href="/account" className="hover:text-brand-navy-800 transition-colors">
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </Link>
            
            <Link href="/wishlist" className="hover:text-brand-navy-800 transition-colors">
              <Heart className="h-6 w-6" />
              <span className="sr-only">Wishlist</span>
            </Link>
            
            <Link href="/cart" className="relative hover:text-brand-navy-800 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1.5 -right-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-cyan-500 text-[10px] font-bold text-brand-navy-900 shadow-sm border border-white">
                0
              </span>
            </Link>
          </div>
          
        </div>
      </div>
        </div>
      </div>
      
      {/* Tier 3: Secondary Navbar (Categories, Links, Hotline) */}
      <div className="bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-8 h-full">
            {/* Browse Categories Dropdown */}
            <div className="relative h-full group flex items-center">
              <button className="flex h-[52px] items-center gap-3 bg-brand-navy-800 px-6 text-[15px] font-semibold text-white hover:bg-brand-navy-900 transition-colors rounded-md shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                Browse All Categories
                <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:-rotate-180" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-[calc(100%-8px)] left-0 w-72 bg-white border border-gray-100 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-2 transition-all duration-300 z-50 flex flex-col py-2">
                {[
                  { name: "Business Cards & Stationery", href: "/categories/business-cards" },
                  { name: "Marketing Materials", href: "/categories/marketing" },
                  { name: "Signs, Banners & Posters", href: "/categories/signs-banners" },
                  { name: "Labels, Stickers & Packaging", href: "/categories/labels-stickers" },
                  { name: "Clothing & Apparel", href: "/categories/apparel" },
                  { name: "Promotional Products", href: "/categories/promotional" },
                  { name: "Drinkware", href: "/categories/drinkware" },
                  { name: "Design Services", href: "/services/design" },
                ].map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.href} 
                    className="px-6 py-3 hover:bg-gray-50 text-[14px] text-gray-700 hover:text-brand-navy-800 flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/link:bg-brand-navy-800 transition-colors"></span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Links */}
            <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-brand-navy-900">
              <Link href="/products" className="flex items-center gap-1 hover:text-brand-navy-800 transition-colors">
                All Products <span className="text-gray-400 font-normal">+</span>
              </Link>
              <Link href="/business-cards" className="flex items-center gap-1 hover:text-brand-navy-800 transition-colors">
                Business Cards <span className="text-gray-400 font-normal">+</span>
              </Link>
              <Link href="/signs-banners" className="flex items-center gap-1 hover:text-brand-navy-800 transition-colors">
                Signs & Banners <span className="text-gray-400 font-normal">+</span>
              </Link>
              <Link href="/marketing" className="flex items-center gap-1 hover:text-brand-navy-800 transition-colors">
                Marketing <span className="text-gray-400 font-normal">+</span>
              </Link>
              <Link href="/promotional" className="flex items-center gap-1 hover:text-brand-navy-800 transition-colors">
                Promotional <span className="text-gray-400 font-normal">+</span>
              </Link>
            </nav>
          </div>

          {/* Hotline */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#1d214c]">Hotline: (+1) 435 485 232</div>
              <div className="text-[11px] text-gray-500">Buy online, free store pickup</div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
