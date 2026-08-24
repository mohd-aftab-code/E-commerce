"use client";

import { useState, useMemo, useTransition } from "react";
import { formatPrice } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Check, UploadCloud, Loader2 } from "lucide-react";
import { addToCart } from "@/features/storefront/cart/actions";
import { useRouter } from "next/navigation";

// The full product payload expected from the query
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

export function ProductCustomizer({ product }: ProductCustomizerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Determine defaults
  const defaultQuantity = product.pricingTiers[0]?.quantity || 1;
  const defaultOptions: Record<string, string> = {};
  
  product.options.forEach((option) => {
    const defaultValue = option.values.find((v) => v.isDefault) || option.values[0];
    if (defaultValue) {
      defaultOptions[option.id] = defaultValue.id;
    }
  });

  // State
  const [quantity, setQuantity] = useState<number>(defaultQuantity);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(defaultOptions);

  // Handlers
  const handleOptionChange = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  // Price Calculation Logic
  const totalPrice = useMemo(() => {
    // 1. Get base price for the selected quantity
    const tier = product.pricingTiers.find((t) => t.quantity === quantity);
    let price = tier ? tier.price : product.basePrice;

    // 2. Add modifiers for selected options
    Object.entries(selectedOptions).forEach(([optionId, valueId]) => {
      const option = product.options.find((o) => o.id === optionId);
      const value = option?.values.find((v) => v.id === valueId);
      if (value && value.priceModifier) {
        price += value.priceModifier; 
      }
    });

    return price;
  }, [product, quantity, selectedOptions]);

  const handleAddToCart = () => {
    startTransition(async () => {
      const res = await addToCart({
        productId: product.id,
        quantity,
        price: totalPrice,
        options: selectedOptions
      });
      if (res.success) {
        router.push("/cart");
      } else {
        alert("Failed to add to cart: " + res.error);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* LEFT COL: Image & Description */}
      <div className="lg:col-span-7">
        <div className="aspect-[4/3] w-full rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
           {product.imageUrl ? (
             // eslint-disable-next-line @next/next/no-img-element
             <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
           ) : (
             <div className="text-gray-400">Image Preview</div>
           )}
        </div>
        
        <div className="mt-8 prose prose-gray max-w-none">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-4 mb-4">Product Details</h2>
          <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
        </div>
      </div>

      {/* RIGHT COL: Configuration Form */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          
          <div className="mb-8 border-b border-gray-100 pb-6">
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-4 text-3xl font-bold text-brand-royal-600 tracking-tight">
              {formatPrice(totalPrice)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              For {quantity} pieces ({formatPrice(totalPrice / quantity)} / ea)
            </p>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Dynamic Options */}
            {product.options.map((option) => (
              <div key={option.id}>
                <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {option.name}
                </label>
                
                {option.type === 'RADIO' ? (
                  // Radio Button Style for Options
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {option.values.map((val) => {
                      const isSelected = selectedOptions[option.id] === val.id;
                      return (
                        <div
                          key={val.id}
                          onClick={() => handleOptionChange(option.id, val.id)}
                          className={`relative cursor-pointer rounded-lg border p-4 focus:outline-none transition-colors ${
                            isSelected 
                              ? 'border-brand-royal-600 bg-brand-cyan-500/5 ring-1 ring-brand-royal-600' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <span className="block text-sm font-medium text-gray-900">
                            {val.label}
                          </span>
                          {val.priceModifier > 0 && (
                            <span className="mt-1 block text-xs text-gray-500">
                              + {formatPrice(val.priceModifier)}
                            </span>
                          )}
                          {isSelected && (
                            <Check className="absolute top-4 right-4 h-4 w-4 text-brand-royal-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Select Dropdown Style for Options
                  <select
                    value={selectedOptions[option.id] || ''}
                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                    className="mt-3 block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-royal-600 sm:text-sm"
                  >
                    {option.values.map((val) => (
                      <option key={val.id} value={val.id}>
                        {val.label} {val.priceModifier > 0 ? `(+ ${formatPrice(val.priceModifier)})` : ''}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            {/* Quantity Selector */}
            {product.pricingTiers.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-3 block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-royal-600 sm:text-sm font-medium"
                >
                  {product.pricingTiers.map((tier) => (
                    <option key={tier.id} value={tier.quantity}>
                      {tier.quantity} pieces
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Artwork Upload Stub */}
            <div className="pt-4">
               <button 
                 type="button"
                 className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-sm font-medium text-gray-600 hover:border-brand-royal-600 hover:text-brand-royal-600 transition-colors"
               >
                 <UploadCloud className="h-6 w-6" />
                 <span>Upload Artwork File (PDF, AI, EPS)</span>
               </button>
            </div>

            {/* Add to Cart Action */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isPending}
              className="flex w-full items-center justify-center rounded-md bg-brand-navy-900 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-brand-royal-600 focus:outline-none focus:ring-2 focus:ring-brand-royal-600 focus:ring-offset-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Adding to Cart...
                </>
              ) : (
                `Add to Cart — ${formatPrice(totalPrice)}`
              )}
            </button>
            
          </form>
        </div>
      </div>
      
    </div>
  );
}
