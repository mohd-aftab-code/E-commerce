"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Heart, Menu, X, MapPin, Search, ChevronDown, Phone } from "lucide-react";

const categories = [
  { name: "Business Cards & Stationery", href: "/categories/business-cards" },
  { name: "Marketing Materials", href: "/categories/marketing" },
  { name: "Signs, Banners & Posters", href: "/categories/signs-banners" },
  { name: "Labels, Stickers & Packaging", href: "/categories/labels-stickers" },
  { name: "Clothing & Apparel", href: "/categories/apparel" },
  { name: "Promotional Products", href: "/categories/promotional" },
  { name: "Drinkware", href: "/categories/drinkware" },
  { name: "Design Services", href: "/services/design" },
];

const navLinks = [
  { label: "All Products", href: "/products" },
  { label: "Business Cards", href: "/business-cards" },
  { label: "Signs & Banners", href: "/signs-banners" },
  { label: "Marketing", href: "/marketing" },
  { label: "Promotional", href: "/promotional" },
];

export function StorefrontNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (isScrolled) setMobileMenuOpen(false);
  }, [isScrolled]);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full bg-white flex flex-col transition-shadow duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"}`}>

        {/* ── Collapsible: Tier 1 + Tier 2 ── */}
        <div className={`w-full grid transition-all duration-500 ease-in-out ${isScrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}>
          <div className="overflow-hidden flex flex-col w-full">

            {/* Tier 1: Top Bar (Desktop only) */}
            <div className="bg-[#f7f7f7] text-[#555555] text-[13px] border-b border-gray-100 hidden lg:block">
              <div className="mx-auto flex h-10 max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                  <Link href="/contact" className="hover:text-brand-royal-600 transition-colors">Contact</Link>
                  <Link href="/blog" className="hover:text-brand-royal-600 transition-colors">Blog</Link>
                  <Link href="/order-tracking" className="hover:text-brand-royal-600 transition-colors">Order Tracking</Link>
                </div>
                <div className="flex items-center">
                  <span>Spring Sale. Sweet Crunchy Salad.</span>
                  <Link href="/sale" className="ml-2 font-semibold hover:text-brand-royal-600 underline decoration-gray-300 underline-offset-4 flex items-center">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </div>
                <div className="flex items-center gap-5">
                  <Link href="/stores" className="flex items-center gap-1.5 hover:text-brand-royal-600 transition-colors">
                    <MapPin className="h-4 w-4" />Store near me
                  </Link>
                  <div className="flex items-center gap-1 cursor-pointer hover:text-brand-royal-600">
                    USD <ChevronDown className="h-3 w-3" />
                  </div>
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-brand-royal-600">
                    <div className="w-4 h-4 rounded-full overflow-hidden flex flex-col border border-gray-200">
                      <div className="w-full flex-1 bg-red-600" />
                      <div className="w-full flex-1 bg-white" />
                      <div className="w-full flex-1 bg-blue-600" />
                    </div>
                    English <ChevronDown className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tier 2: Main Navbar */}
            <div className="border-b border-gray-100">
              <div className="mx-auto flex h-16 md:h-20 lg:h-24 max-w-[1536px] items-center justify-between px-3 sm:px-6 lg:px-8 gap-3">

                {/* Mobile: Hamburger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:bg-gray-100 transition-colors lg:hidden flex-shrink-0"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                  <Image
                    src="/logo/logo.png"
                    alt="PS24 Logo"
                    width={140}
                    height={36}
                    className="object-contain w-auto h-8 md:h-10 lg:h-11"
                  />
                </Link>

                {/* Desktop Search */}
                <div className="hidden lg:flex flex-1 max-w-2xl mx-8 xl:mx-12">
                  <div className="flex w-full items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden h-[50px] focus-within:border-brand-navy-800 focus-within:ring-1 focus-within:ring-brand-navy-800 transition-all">
                    <div className="flex items-center pl-4 pr-3 border-r border-gray-200 cursor-pointer text-sm font-medium text-gray-700 min-w-max hover:text-brand-navy-800">
                      All categories <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
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

                {/* Right Icons */}
                <div className="flex items-center gap-2 sm:gap-4 text-gray-600">
                  {/* Mobile Search toggle */}
                  <button
                    onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                    className="lg:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </button>

                  <Link href="/account" className="hover:text-brand-navy-800 transition-colors hidden sm:block">
                    <User className="h-6 w-6" />
                    <span className="sr-only">Account</span>
                  </Link>
                  <Link href="/wishlist" className="hover:text-brand-navy-800 transition-colors hidden sm:block">
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

              {/* Mobile Search Bar (expandable) */}
              <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileSearchOpen ? "max-h-[64px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-3 pb-3">
                  <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 overflow-hidden h-11 focus-within:border-brand-navy-800 focus-within:ring-1 focus-within:ring-brand-navy-800 transition-all">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-800"
                    />
                    <button className="flex h-full w-12 items-center justify-center text-gray-400 hover:text-brand-navy-800">
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tier 3: Secondary Navbar (Desktop) */}
        <div className="bg-white border-b border-gray-100 hidden md:block">
          <div className="mx-auto flex h-[60px] lg:h-[68px] max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 lg:gap-8 h-full">
              {/* Browse Categories Dropdown */}
              <div className="relative h-full group flex items-center">
                <button className="flex h-10 lg:h-[52px] items-center gap-2 lg:gap-3 bg-brand-navy-800 px-4 lg:px-6 text-[14px] lg:text-[15px] font-semibold text-white hover:bg-brand-navy-900 transition-colors rounded-md shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                  Browse All Categories
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:-rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-72 bg-white border border-gray-100 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-300 z-50 flex flex-col py-2 mt-1">
                  {categories.map((item, idx) => (
                    <Link key={idx} href={item.href} className="px-6 py-3 hover:bg-gray-50 text-[14px] text-gray-700 hover:text-brand-navy-800 flex items-center gap-3 border-b border-gray-50 last:border-0 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nav Links */}
              <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-brand-navy-900">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="flex items-center gap-1 hover:text-brand-navy-800 transition-colors whitespace-nowrap">
                    {link.label} <span className="text-gray-400 font-normal">+</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Hotline */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 bg-gray-50">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#1d214c]">Hotline: (+1) 435 485 232</div>
                <div className="text-[11px] text-gray-500">Buy online, free store pickup</div>
              </div>
            </div>
          </div>
        </div>

      </header>

      {/* ── Mobile Menu Drawer (Slide-in) ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[80vw] max-w-[320px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <Image src="/logo/logo.png" alt="PS24 Logo" width={120} height={32} className="object-contain h-8 w-auto" />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-md hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* Account links */}
          <div className="flex items-center gap-4 px-4 pb-4 border-b border-gray-100 mb-2">
            <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-navy-800">
              <User className="h-4 w-4" /> Account
            </Link>
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-navy-800">
              <Heart className="h-4 w-4" /> Wishlist
            </Link>
          </div>

          {/* Nav Links */}
          <div className="px-4 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Navigation</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center py-3 text-[15px] font-semibold text-brand-navy-900 hover:text-brand-navy-800 border-b border-gray-50 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div className="px-4 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">All Categories</p>
            {categories.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-[14px] text-gray-700 hover:text-brand-navy-800 border-b border-gray-50 last:border-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-navy-800 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Info links */}
          <div className="px-4 border-t border-gray-100 pt-4">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-brand-navy-800">Contact</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-brand-navy-800">Blog</Link>
            <Link href="/order-tracking" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-brand-navy-800">Order Tracking</Link>
            <Link href="/stores" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-brand-navy-800">
              <MapPin className="h-4 w-4" /> Store near me
            </Link>
          </div>
        </div>

        {/* Footer Hotline */}
        <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-[#1d214c]">(+1) 435 485 232</div>
              <div className="text-[11px] text-gray-500">Buy online, free store pickup</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
