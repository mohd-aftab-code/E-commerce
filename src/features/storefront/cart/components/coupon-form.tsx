"use client";

import { useState, useTransition } from "react";
import confetti from "canvas-confetti";
import { applyCoupon } from "@/features/storefront/cart/actions";

export function CouponForm() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setMessage(null);

    startTransition(async () => {
      const res = await applyCoupon(code);
      if (res.success) {
        setMessage({ type: "success", text: "Coupon applied successfully!" });
        // Trigger confetti effect
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"]
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"]
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      } else {
        setMessage({ type: "error", text: res.error || "Failed to apply coupon" });
      }
    });
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <form onSubmit={handleApplyCoupon} className="flex gap-2 relative">
        <input 
          type="text" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Discount code" 
          className="flex-1 px-4 h-11 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary-500 font-mono uppercase transition-shadow"
          required
          disabled={isPending}
        />
        <button 
          type="submit"
          disabled={isPending || !code.trim()}
          className="bg-gray-900 text-white h-11 px-6 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? "..." : "Apply"}
        </button>
      </form>
      {message && (
        <p className={`mt-3 text-sm font-medium animate-in fade-in slide-in-from-top-1 ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
