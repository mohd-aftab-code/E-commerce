"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSearchSuggestions } from "@/features/products/actions";
import { formatPrice } from "@/lib/utils";

type Suggestion = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  basePrice: number;
  category: string;
};

interface StorefrontSearchProps {
  variant?: "desktop" | "mobile";
}

export function StorefrontSearch({ variant = "desktop" }: StorefrontSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Close dropdown on outside click
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const results = await getSearchSuggestions(value);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = () => {
    setIsOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className="relative w-full" ref={wrapperRef}>
        <form onSubmit={handleSubmit} className="flex items-center rounded-full border border-gray-200 bg-gray-50 overflow-hidden h-11 focus-within:border-brand-primary-800 transition-all">
          <input 
            name="q" 
            type="text" 
            value={query}
            onChange={handleSearchChange}
            onFocus={() => {
              if (query.trim().length >= 2) setIsOpen(true);
            }}
            placeholder="Search products..." 
            className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-800" 
            required 
            autoComplete="off"
          />
          <button type="submit" className="flex h-full w-12 items-center justify-center text-gray-400 hover:text-brand-primary-800 cursor-pointer">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </button>
        </form>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
            {isLoading && suggestions.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
            ) : suggestions.length > 0 ? (
              <ul className="max-h-[60vh] overflow-y-auto">
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <Link 
                      href={`/products/${product.slug}`}
                      onClick={handleSuggestionClick}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0 relative">
                        {product.imageUrl ? (
                          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="40px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">{product.name}</div>
                        <div className="text-[11px] text-gray-500 truncate">{product.category}</div>
                      </div>
                      <div className="text-sm font-semibold text-brand-primary-800">
                        {formatPrice(product.basePrice)}
                      </div>
                    </Link>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={handleSubmit}
                    className="w-full p-3 text-center text-sm text-brand-primary-800 font-semibold hover:bg-gray-50 bg-gray-50/50"
                  >
                    View all results for "{query}"
                  </button>
                </li>
              </ul>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">No products found for "{query}"</div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop Variant
  return (
    <div className="flex-1 max-w-2xl mx-8 xl:mx-12 relative" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="flex w-full items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden h-[50px] focus-within:border-brand-primary-800 focus-within:ring-1 focus-within:ring-brand-primary-800 transition-all relative z-50">
        <div className="flex items-center pl-4 pr-3 border-r border-gray-200 cursor-pointer text-sm font-medium text-gray-700 min-w-max hover:text-brand-primary-800">
          All categories <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
        </div>
        <input
          name="q"
          type="text"
          value={query}
          onChange={handleSearchChange}
          onFocus={() => {
            if (query.trim().length >= 2) setIsOpen(true);
          }}
          placeholder="Enter key to search..."
          className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-0 border-transparent focus:border-transparent text-gray-800"
          required
          autoComplete="off"
        />
        <button type="submit" className="flex h-full w-12 items-center justify-center text-gray-400 hover:text-brand-primary-800 cursor-pointer">
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
        </button>
      </form>

      {/* Desktop Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden transform origin-top transition-all">
            {isLoading && suggestions.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-500 flex flex-col items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-brand-primary-800" />
                Searching for products...
              </div>
            ) : suggestions.length > 0 ? (
              <div className="flex flex-col">
                <div className="p-3 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Top Results</span>
                </div>
                <ul className="max-h-[400px] overflow-y-auto">
                  {suggestions.map((product) => (
                    <li key={product.id}>
                      <Link 
                        href={`/products/${product.slug}`}
                        onClick={handleSuggestionClick}
                        className="flex items-center gap-4 p-4 hover:bg-brand-primary-50 border-b border-gray-50 transition-colors group"
                      >
                        <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative border border-gray-200">
                          {product.imageUrl ? (
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="56px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] font-bold text-brand-primary-900 truncate group-hover:text-brand-primary-700 transition-colors">
                            {product.name}
                          </div>
                          <div className="text-[13px] text-gray-500 mt-0.5 flex items-center gap-2">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-600">
                              {product.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-brand-primary-800 bg-brand-primary-50 px-3 py-1 rounded-full">
                            {formatPrice(product.basePrice)}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={handleSubmit}
                  className="w-full p-4 text-center text-sm text-brand-primary-800 font-bold hover:bg-brand-primary-800 hover:text-white transition-colors border-t border-gray-100 flex items-center justify-center gap-2"
                >
                  View all search results <Search className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-10 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
                  <Search className="w-6 h-6" />
                </div>
                <div className="text-base font-semibold text-gray-800">No products found</div>
                <div className="text-sm text-gray-500 max-w-[250px]">
                  We couldn't find anything matching "{query}". Try different keywords.
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
