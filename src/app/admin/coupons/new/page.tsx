"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCoupon } from "@/features/admin/coupon-actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { DiscountType } from "@prisma/client";

export default function NewCouponPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;
    const discountType = formData.get("discountType") as DiscountType;
    const rawValue = parseFloat(formData.get("discountValue") as string);
    const usageLimitStr = formData.get("usageLimit") as string;
    
    // If fixed amount, convert dollars to cents. If percentage, keep as is.
    const discountValue = discountType === "FIXED_AMOUNT" ? Math.round(rawValue * 100) : rawValue;
    const usageLimit = usageLimitStr ? parseInt(usageLimitStr, 10) : null;

    const res = await createCoupon({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      usageLimit,
    });

    if (res.success) {
      router.push("/admin/coupons");
    } else {
      setError(res.error || "Failed to create coupon.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/coupons" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Coupon</h1>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
            <input 
              type="text" 
              name="code" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 outline-none transition-shadow font-mono uppercase" 
              placeholder="e.g. SUMMER2024"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
              <select 
                name="discountType" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 outline-none transition-shadow bg-white"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED_AMOUNT">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
              <input 
                type="number" 
                name="discountValue" 
                step="0.01"
                min="0"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 outline-none transition-shadow" 
                placeholder="e.g. 15"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit (Optional)</label>
            <input 
              type="number" 
              name="usageLimit" 
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary-500 focus:border-brand-primary-500 outline-none transition-shadow" 
              placeholder="Leave blank for unlimited"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-brand-primary-900 text-white px-6 py-2.5 rounded-lg hover:bg-brand-primary-800 transition-colors font-semibold disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : (
                <>
                  <Save className="w-5 h-5" />
                  Save Coupon
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
