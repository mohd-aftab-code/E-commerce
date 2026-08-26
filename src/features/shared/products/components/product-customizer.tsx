"use client";

import { useState, useMemo, useTransition } from "react";
import { formatPrice } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import {
  FiCheck,
  FiUploadCloud,
  FiLoader,
  FiShield,
  FiTruck,
  FiClock,
  FiStar,
  FiChevronDown,
  FiChevronRight,
  FiPhone,
  FiPrinter,
} from "react-icons/fi";
import { addToCart } from "@/features/storefront/cart/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    category: true;
    options: { include: { values: true } };
    pricingTiers: true;
  };
}>;

interface ProductCustomizerProps {
  product: ProductWithDetails;
}

type Tab = "description" | "specs" | "turnaround";

const TRUST_BADGES = [
  { icon: FiShield, label: "Quality Guaranteed", sub: "100% satisfaction or reprint" },
  { icon: FiTruck, label: "Free Shipping", sub: "On orders over $75" },
  { icon: FiClock, label: "Fast Turnaround", sub: "3–5 business days" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function ProductCustomizer({ product }: ProductCustomizerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [needsDesign, setNeedsDesign] = useState<boolean>(false);

  // Defaults
  const defaultQty = product.pricingTiers[0]?.quantity ?? 1;
  const defaultOptions: Record<string, string> = {};
  product.options.forEach((option) => {
    const defaultValue = option.values.find((v) => v.isDefault) ?? option.values[0];
    if (defaultValue) defaultOptions[option.id] = defaultValue.id;
  });

  const [quantity, setQuantity] = useState<number>(defaultQty);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(defaultOptions);

  const handleOptionChange = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  // Price calculation
  const totalPrice = useMemo(() => {
    const tier = product.pricingTiers.find((t) => t.quantity === quantity);
    let price = tier ? tier.price : product.basePrice;
    Object.entries(selectedOptions).forEach(([optionId, valueId]) => {
      const option = product.options.find((o) => o.id === optionId);
      const value = option?.values.find((v) => v.id === valueId);
      if (value?.priceModifier) price += value.priceModifier;
    });
    return price;
  }, [product, quantity, selectedOptions]);

  const pricePerPiece = quantity > 0 ? totalPrice / quantity : totalPrice;

  const handleAddToCart = () => {
    startTransition(async () => {
      const res = await addToCart({
        productId: product.id,
        quantity,
        price: totalPrice,
        options: { ...selectedOptions, needsDesign: needsDesign ? "yes" : "no" },
      });
      if (res.success) {
        router.push("/cart");
      } else {
        alert("Failed to add to cart: " + res.error);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">

      {/* ── LEFT: Image + Tabs ── */}
      <div className="lg:col-span-7 space-y-6">

        {/* Main product image */}
        <div className="relative aspect-[4/3] w-full rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden shadow-sm">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
              <FiPrinter className="h-14 w-14 text-gray-300" />
              <span className="text-sm font-medium">Product Image</span>
            </div>
          )}
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-brand-cyan-500 text-brand-primary-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Most Popular
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Tab nav */}
          <div className="flex border-b border-gray-100 overflow-x-auto whitespace-nowrap">
            {(
              [
                { id: "description", label: "Description" },
                { id: "specs", label: "Specifications" },
                { id: "turnaround", label: "Turnaround" },
              ] as { id: Tab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] py-4 text-xs sm:text-sm font-bold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-brand-primary-800 text-brand-primary-800"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-4 sm:p-6">
            {activeTab === "description" && (
              <div className="prose prose-sm prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {product.description || "Premium quality printing with fast turnaround. Contact us for custom requirements."}
                </p>
              </div>
            )}
            {activeTab === "specs" && (
              <div className="space-y-3 text-sm">
                {[
                  { label: "Product", value: product.name },
                  { label: "Category", value: product.category?.name ?? "—" },
                  { label: "Min Quantity", value: `${product.pricingTiers[0]?.quantity ?? 1} pieces` },
                  { label: "Max Quantity", value: `${product.pricingTiers[product.pricingTiers.length - 1]?.quantity ?? "Custom"} pieces` },
                  { label: "Turnaround", value: "3–5 business days" },
                  { label: "Shipping", value: "Free on orders $75+" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="font-semibold text-gray-700">{row.label}</span>
                    <span className="text-gray-600">{row.value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "turnaround" && (
              <div className="space-y-4 text-sm">
                {[
                  { option: "Standard", time: "3–5 business days", price: "Included", highlight: false },
                  { option: "Rush (2-day)", time: "2 business days", price: "+20%", highlight: false },
                  { option: "Same Day*", time: "Same business day", price: "+50%", highlight: true },
                ].map((row) => (
                  <div
                    key={row.option}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      row.highlight
                        ? "border-brand-cyan-500 bg-brand-cyan-500/5"
                        : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <div>
                      <p className="font-bold text-gray-800">{row.option}</p>
                      <p className="text-gray-500">{row.time}</p>
                    </div>
                    <span className={`font-bold text-sm ${row.highlight ? "text-brand-primary-800" : "text-gray-700"}`}>
                      {row.price}
                    </span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 pt-1">*Same day available for orders placed before 10 AM EST. Tampa pickup only.</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews strip */}
        <div className="flex items-center gap-3 px-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-800">4.9 out of 5</span>
          <span className="text-sm text-gray-400">based on 238 reviews</span>
        </div>
      </div>

      {/* ── RIGHT: Order Panel ── */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 space-y-4">

          {/* Product header */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary-600 mb-1">
              {product.category?.name ?? "Product"}
            </p>
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>
            {product.shortDesc && (
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{product.shortDesc}</p>
            )}

            {/* Live price */}
            <div className="mt-5 flex items-end gap-3">
              <span className="text-4xl font-extrabold text-brand-primary-800 tracking-tight">
                {formatPrice(totalPrice)}
              </span>
              <div className="pb-1 text-sm text-gray-500 leading-tight">
                <span className="block">{formatPrice(pricePerPiece)} / each</span>
                <span className="block">for {quantity} pieces</span>
              </div>
            </div>
          </div>

          {/* ── Quantity Pricing Table ── */}
          {product.pricingTiers.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-[#f7f9fb] border-b border-gray-100">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                  Quantity Pricing — More = Less Per Piece
                </p>
              </div>
              <div className="divide-y divide-gray-50">
                {/* Header row */}
                <div className="grid grid-cols-3 px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  <span>Qty</span>
                  <span className="text-center">Per Piece</span>
                  <span className="text-right">Total</span>
                </div>
                {product.pricingTiers.map((tier) => {
                  const isSelected = quantity === tier.quantity;
                  // Add option modifiers to display price
                  let tierTotal = tier.price;
                  Object.entries(selectedOptions).forEach(([optionId, valueId]) => {
                    const option = product.options.find((o) => o.id === optionId);
                    const value = option?.values.find((v) => v.id === valueId);
                    if (value?.priceModifier) tierTotal += value.priceModifier;
                  });
                  const perPiece = tier.quantity > 0 ? tierTotal / tier.quantity : tierTotal;

                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setQuantity(tier.quantity)}
                      className={`w-full grid grid-cols-3 items-center px-5 py-3.5 text-sm transition-colors text-left ${
                        isSelected
                          ? "bg-brand-primary-800 text-white"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="font-bold">
                        {tier.quantity.toLocaleString()}
                        {isSelected && (
                          <FiCheck className="inline ml-1.5 h-3.5 w-3.5" />
                        )}
                      </span>
                      <span className={`text-center font-semibold ${isSelected ? "text-brand-cyan-400" : "text-brand-primary-600"}`}>
                        {formatPrice(perPiece)}
                      </span>
                      <span className="text-right font-bold">
                        {formatPrice(tierTotal)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Options ── */}
          {product.options.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
              {product.options.map((option) => (
                <div key={option.id}>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">
                    {option.name}
                  </label>
                  {option.type === "RADIO" ? (
                    <div className="grid grid-cols-2 gap-2">
                      {option.values.map((val) => {
                        const isSelected = selectedOptions[option.id] === val.id;
                        return (
                          <button
                            key={val.id}
                            type="button"
                            onClick={() => handleOptionChange(option.id, val.id)}
                            className={`relative text-left rounded-xl border px-4 py-3 text-sm transition-all ${
                              isSelected
                                ? "border-brand-primary-800 bg-brand-primary-800/5 ring-1 ring-brand-primary-800 font-semibold text-brand-primary-800"
                                : "border-gray-200 hover:border-gray-300 text-gray-700"
                            }`}
                          >
                            <span className="block leading-tight">{val.label}</span>
                            {val.priceModifier > 0 && (
                              <span className="block text-[11px] text-gray-400 mt-0.5">
                                + {formatPrice(val.priceModifier)}
                              </span>
                            )}
                            {isSelected && (
                              <FiCheck className="absolute top-2.5 right-2.5 h-3.5 w-3.5 text-brand-primary-800" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        value={selectedOptions[option.id] ?? ""}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        className="w-full appearance-none rounded-xl border border-gray-200 py-3 pl-4 pr-10 text-sm text-gray-900 focus:border-brand-primary-800 focus:ring-1 focus:ring-brand-primary-800 focus:outline-none"
                      >
                        {option.values.map((val) => (
                          <option key={val.id} value={val.id}>
                            {val.label}
                            {val.priceModifier > 0 ? ` (+ ${formatPrice(val.priceModifier)})` : ""}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Artwork & Design Services ── */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                1. Provide Your Design
              </p>
              <label
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-6 cursor-pointer transition-colors ${
                  uploadedFile
                    ? "border-green-400 bg-green-50"
                    : "border-gray-200 hover:border-brand-primary-800 hover:bg-gray-50"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.ai,.eps,.psd,.png,.jpg,.jpeg"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                       setUploadedFile(file.name);
                       setNeedsDesign(false);
                    }
                  }}
                />
                {uploadedFile ? (
                  <>
                    <FiCheck className="h-6 w-6 text-green-500" />
                    <span className="text-sm font-semibold text-green-700">{uploadedFile}</span>
                  </>
                ) : (
                  <>
                    <FiUploadCloud className="h-6 w-6 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Upload Print-Ready File</span>
                  </>
                )}
              </label>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">OR</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  setNeedsDesign(!needsDesign);
                  if (!needsDesign) setUploadedFile(null);
                }}
                className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-4 transition-all text-left ${
                  needsDesign
                    ? "border-brand-primary-800 bg-brand-primary-800/5 ring-1 ring-brand-primary-800"
                    : "border-gray-200 hover:border-gray-300 bg-gray-50"
                }`}
              >
                <div>
                  <span className={`block font-bold ${needsDesign ? "text-brand-primary-800" : "text-gray-800"}`}>
                    Hire a Designer
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    Our team will design it for you. Proof provided before printing.
                  </span>
                </div>
                {needsDesign ? (
                  <FiCheck className="h-5 w-5 text-brand-primary-800" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* ── Add to Cart ── */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-primary-800 px-8 py-4 text-base font-extrabold text-white hover:bg-brand-primary-900 focus:outline-none focus:ring-2 focus:ring-brand-primary-800 focus:ring-offset-2 shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <FiLoader className="h-5 w-5 animate-spin" />
                  Adding to Cart...
                </>
              ) : (
                <>
                  Add to Cart — {formatPrice(totalPrice)}
                  <FiChevronRight className="h-4 w-4" />
                </>
              )}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-brand-primary-800 px-8 py-4 text-sm font-bold text-brand-primary-800 hover:bg-brand-primary-800/5 transition-colors"
            >
              <FiPhone className="h-4 w-4" />
              Request a Quote Instead
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-[#f7f9fb] border border-gray-100"
              >
                <badge.icon className="h-5 w-5 text-brand-primary-800" />
                <span className="text-[10px] font-bold text-gray-700 leading-tight">{badge.label}</span>
                <span className="text-[9px] text-gray-400 leading-tight">{badge.sub}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
