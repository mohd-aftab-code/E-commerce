"use client";

import { useState } from "react";
import { savePricingTiers } from "@/features/admin/actions";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export function ProductPricingTab({ productId, initialTiers }: { productId: string, initialTiers: any[] }) {
  const [tiers, setTiers] = useState<{ id: string; quantity: string; price: string }[]>(
    initialTiers.map(t => ({
      id: t.id || Math.random().toString(),
      quantity: t.quantity.toString(),
      price: (t.price / 100).toFixed(2)
    }))
  );
  const [isLoading, setIsLoading] = useState(false);

  const addTier = () => {
    setTiers([...tiers, { id: Math.random().toString(), quantity: "", price: "" }]);
  };

  const removeTier = (id: string) => {
    setTiers(tiers.filter(t => t.id !== id));
  };

  const updateTier = (id: string, field: "quantity" | "price", value: string) => {
    setTiers(tiers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Validate
    const validTiers = tiers
      .filter(t => t.quantity !== "" && t.price !== "")
      .map(t => ({
        quantity: parseInt(t.quantity, 10),
        price: Math.round(parseFloat(t.price) * 100)
      }))
      .filter(t => !isNaN(t.quantity) && !isNaN(t.price));

    const result = await savePricingTiers(productId, validTiers);
    if (!result.success) {
      alert(result.error);
    } else {
      alert("Pricing tiers saved successfully!");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Quantity Pricing Tiers</h3>
        <p className="mt-1 text-sm text-gray-500">
          Define volume discounts. Example: 100 qty for $15.00, 250 qty for $25.00.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-12 gap-4 mb-2 px-2 text-sm font-medium text-gray-700">
          <div className="col-span-5">Quantity</div>
          <div className="col-span-5">Total Price (USD)</div>
          <div className="col-span-2"></div>
        </div>
        
        {tiers.map((tier) => (
          <div key={tier.id} className="grid grid-cols-12 gap-4 items-center mb-3">
            <div className="col-span-5">
              <input
                type="number"
                value={tier.quantity}
                onChange={(e) => updateTier(tier.id, "quantity", e.target.value)}
                placeholder="e.g. 100"
                min="1"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-gray-900 sm:text-sm"
              />
            </div>
            <div className="col-span-5 relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={tier.price}
                onChange={(e) => updateTier(tier.id, "price", e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="block w-full rounded-md border border-gray-300 pl-7 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-gray-900 sm:text-sm"
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="button"
                onClick={() => removeTier(tier.id)}
                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTier}
          className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-900 font-medium"
        >
          <FiPlus className="mr-1" /> Add Pricing Tier
        </button>
      </div>

      <div className="pt-5 flex justify-end gap-3">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Pricing"}
        </button>
      </div>
    </div>
  );
}
