"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  MapPin,
  Search,
  ChevronDown,
  ChevronRight,
  Phone,
} from "lucide-react";

// ─── Mega-menu data (now passed from DB) ────────────────────────────────────────

const navLinks = [
  { label: "All Products", href: "/products" },
  { label: "Business Cards", href: "/business-cards" },
  { label: "Signs & Banners", href: "/signs-banners" },
  { label: "Marketing", href: "/marketing" },
  { label: "Promotional", href: "/promotional" },
];

// ─── Fallback icon (colored initial) when image missing ──────────────────────
function CategoryIcon({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="w-9 h-9 rounded-full bg-brand-navy-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
      <Image
        src={src}
        alt={name}
        width={36}
        height={36}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function StorefrontNavbar({ initialCategories = [] }: { initialCategories?: any[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(initialCategories.length > 0 ? initialCategories[0].id : null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolled) setMobileMenuOpen(false);
  }, [isScrolled]);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleMegaEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const activeData = initialCategories.find((c) => c.id === activeCategory);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white flex flex-col transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        {/* ── Collapsible wrapper (hides on scroll) ── */}
        <div
          className={`w-full grid transition-all duration-500 ease-in-out ${
            isScrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
          }`}
        >
          <div className="overflow-hidden flex flex-col w-full">

            {/* Tier 1: Top Bar */}
            <div className="bg-[#f7f7f7] text-[#555555] text-[13px] border-b border-gray-100 hidden lg:block">
              <div className="mx-auto flex h-10 max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                  <Link href="/contact" className="hover:text-brand-royal-600 transition-colors">Contact</Link>
                  <Link href="/blog" className="hover:text-brand-royal-600 transition-colors">Blog</Link>
                  <Link href="/order-tracking" className="hover:text-brand-royal-600 transition-colors">Order Tracking</Link>
                </div>
                <div className="flex items-center">
                  <span>Spring Sale — Free shipping on orders over $49.</span>
                  <Link href="/sale" className="ml-2 font-semibold hover:text-brand-royal-600 underline decoration-gray-300 underline-offset-4 flex items-center">
                    Shop Now
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </Link>
                </div>
                <div className="flex items-center gap-5">
                  <Link href="/stores" className="flex items-center gap-1.5 hover:text-brand-royal-600 transition-colors">
                    <MapPin className="h-4 w-4" /> Store near me
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

                {/* Mobile hamburger */}
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
                    alt="Print Studio 24"
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

              {/* Mobile Search Bar */}
              <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileSearchOpen ? "max-h-[64px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-3 pb-3">
                  <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 overflow-hidden h-11 focus-within:border-brand-navy-800 transition-all">
                    <input type="text" placeholder="Search products..." className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-800" />
                    <button className="flex h-full w-12 items-center justify-center text-gray-400 hover:text-brand-navy-800">
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tier 3: Secondary Nav */}
        <div className="bg-white border-b border-gray-100 hidden md:block">
          <div className="mx-auto flex h-[60px] lg:h-[68px] max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 lg:gap-8 h-full">

              {/* ── Browse All Categories Mega Trigger ── */}
              <div
                ref={megaRef}
                className="relative h-full flex items-center"
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleMegaLeave}
              >
                <button
                  onClick={() => setMegaOpen((v) => !v)}
                  className="flex h-10 lg:h-[52px] items-center gap-2 lg:gap-3 bg-brand-navy-800 px-4 lg:px-6 text-[14px] lg:text-[15px] font-semibold text-white hover:bg-brand-navy-900 transition-colors rounded-md shadow-sm"
                  aria-expanded={megaOpen}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                  Browse All Categories
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${megaOpen ? "-rotate-180" : ""}`} />
                </button>

                {/* ── Mega Dropdown Panel ── */}
                <div
                  className={`absolute top-full left-0 bg-white border border-gray-100 shadow-2xl rounded-b-xl z-50 flex transition-all duration-200 origin-top ${
                    megaOpen
                      ? "opacity-100 scale-y-100 pointer-events-auto"
                      : "opacity-0 scale-y-95 pointer-events-none"
                  }`}
                  style={{ minWidth: "680px" }}
                  onMouseEnter={handleMegaEnter}
                  onMouseLeave={handleMegaLeave}
                >
                  {/* Left: Category List */}
                  <div className="w-[220px] flex-shrink-0 bg-[#fafafa] border-r border-gray-100 py-2 rounded-bl-xl">
                    {initialCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        onClick={() => { setMegaOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          activeCategory === cat.id
                            ? "bg-white text-brand-navy-800 font-semibold border-r-2 border-brand-navy-800"
                            : "text-gray-700 hover:bg-white hover:text-brand-navy-800"
                        }`}
                      >
                        <CategoryIcon src={cat.icon} name={cat.name} />
                        <span className="text-[13px] leading-tight flex-1">{cat.name}</span>
                        {cat.hasChildren && (
                          <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Right: Subcategories */}
                  <div className="flex-1 p-6 min-h-[420px]">
                    {activeData && activeData.subcategories.length > 0 ? (
                      <>
                        {/* Category header with image */}
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={activeData.icon}
                              alt={activeData.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Category</p>
                            <Link
                              href={activeData.href}
                              onClick={() => setMegaOpen(false)}
                              className="text-[16px] font-bold text-brand-navy-800 hover:underline"
                            >
                              {activeData.name}
                            </Link>
                          </div>
                          <Link
                            href={activeData.href}
                            onClick={() => setMegaOpen(false)}
                            className="ml-auto text-[12px] text-brand-navy-800 font-semibold hover:underline flex items-center gap-1"
                          >
                            View All <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>

                        {/* Subcategory grid */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                          {activeData.subcategories.map((sub: any) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMegaOpen(false)}
                              className="flex items-center gap-2.5 py-2 text-[13px] text-gray-600 hover:text-brand-navy-800 transition-colors group"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-brand-navy-800 transition-colors flex-shrink-0" />
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                        <div className="w-16 h-16 rounded-xl overflow-hidden">
                          <Image src={activeData?.icon ?? ""} alt="" width={64} height={64} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-sm">Browse {activeData?.name}</p>
                        <Link
                          href={activeData?.href ?? "#"}
                          onClick={() => setMegaOpen(false)}
                          className="text-brand-navy-800 font-semibold text-sm hover:underline flex items-center gap-1"
                        >
                          View All Products <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-brand-navy-900">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-1 hover:text-brand-navy-800 transition-colors whitespace-nowrap"
                  >
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

      {/* ── Mobile Menu Drawer ── */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[340px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-brand-navy-800">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            <span className="text-white font-bold text-[15px]">Browse All Categories</span>
            <ChevronDown className="h-4 w-4 text-white/70" />
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-md hover:bg-white/10">
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Category List */}
        <div className="flex-1 overflow-y-auto">
          {initialCategories.map((cat) => (
            <div key={cat.id} className="border-b border-gray-50">
              <button
                onClick={() =>
                  setMobileExpandedCat((prev) => (prev === cat.id ? null : cat.id))
                }
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <CategoryIcon src={cat.icon} name={cat.name} />
                <span className="text-[14px] font-medium text-gray-800 flex-1">{cat.name}</span>
                {cat.hasChildren && (
                  <ChevronRight
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                      mobileExpandedCat === cat.id ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>

              {/* Mobile subcategories */}
              {cat.hasChildren && mobileExpandedCat === cat.id && (
                <div className="bg-gray-50 px-4 pb-2">
                  {cat.subcategories.map((sub: any) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 py-2 text-[13px] text-gray-600 hover:text-brand-navy-800 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                      {sub.name}
                    </Link>
                  ))}
                  <Link
                    href={cat.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1 py-2 text-[12px] font-semibold text-brand-navy-800 hover:underline"
                  >
                    View All {cat.name} <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* Extra links */}
          <div className="px-4 py-4 border-t border-gray-100">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Quick Links</p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center py-2.5 text-[14px] font-semibold text-brand-navy-900 hover:text-brand-navy-800 border-b border-gray-50 last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="px-4 pb-4 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-4 mb-3">
              <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-navy-800">
                <User className="h-4 w-4" /> Account
              </Link>
              <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-navy-800">
                <Heart className="h-4 w-4" /> Wishlist
              </Link>
            </div>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1.5 text-sm text-gray-600 hover:text-brand-navy-800">Contact</Link>
            <Link href="/order-tracking" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1.5 text-sm text-gray-600 hover:text-brand-navy-800">Order Tracking</Link>
            <Link href="/stores" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-1.5 text-sm text-gray-600 hover:text-brand-navy-800">
              <MapPin className="h-4 w-4" /> Store near me
            </Link>
          </div>
        </div>

        {/* Drawer footer */}
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
