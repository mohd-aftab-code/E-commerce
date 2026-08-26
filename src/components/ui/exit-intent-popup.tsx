"use client";

import { useEffect, useState, useTransition } from "react";
import { useExitIntent } from "@/hooks/use-exit-intent";
import { X } from "lucide-react";
import { captureExitIntentLead } from "@/features/leads/actions";

export function ExitIntentPopup() {
  const { isPopupVisible, hasSeenPopup, showPopup, hidePopup, markAsSeen } =
    useExitIntent();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (hasSeenPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse leaves the top of the viewport (indicating closing tab or going to address bar)
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasSeenPopup, showPopup]);

  if (!isPopupVisible) return null;

  const handleClose = () => {
    hidePopup();
    markAsSeen();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("idle");
    startTransition(async () => {
      const res = await captureExitIntentLead({ email });
      if (res.success) {
        setStatus("success");
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        setStatus("error");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 text-center shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-900"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="py-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Code Sent!</h3>
            <p className="mt-2 text-gray-600">
              Check your inbox for your 10% off coupon code.
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Wait! Don't leave yet.
            </h2>
            <p className="mb-6 text-gray-600">
              Get <span className="font-bold text-brand-primary-800">10% OFF</span> your first custom print order. Enter your email to claim your discount now.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-brand-primary-800 focus:outline-none focus:ring-1 focus:ring-brand-primary-800"
                disabled={isPending}
              />
              {status === "error" && (
                <p className="text-sm text-red-500 text-left">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-brand-royal-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-royal-700 disabled:opacity-50"
              >
                {isPending ? "Sending..." : "Get 10% Off"}
              </button>
            </form>
            <button
              onClick={handleClose}
              className="mt-4 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              No thanks, I'll pay full price.
            </button>
          </>
        )}
      </div>
    </div>
  );
}
