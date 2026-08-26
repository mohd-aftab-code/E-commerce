"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import Image from "next/image";

export function AuthModal() {
  const { isOpen, view, closeModal } = useAuthModal();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-20 p-2 bg-gray-100/50 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left side: branding / visual */}
            <div className="hidden md:flex flex-col justify-between w-5/12 p-10 text-white relative overflow-hidden">
              {/* Background Image */}
              <Image
                src="/images/auth-bg.jpg"
                alt="Authentication Background"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-brand-primary-900/60 mix-blend-multiply" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-900/90 via-brand-primary-900/20 to-brand-primary-900/40" />
              
              <div className="relative z-10">
                <Image
                  src="/logo/brand-logo-white.png"
                  alt="Print Studio 24"
                  width={200}
                  height={80}
                  className="mb-8 w-auto h-12 object-contain drop-shadow-md"
                  onError={(e) => {
                    // Fallback if white logo doesn't exist
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
                  {view === "login" ? "Welcome back!" : "Join Print Studio 24"}
                </h2>
                <p className="text-white/90 text-sm leading-relaxed drop-shadow-md">
                  {view === "login"
                    ? "Access your dashboard to track orders, manage designs, and reorder your favorite prints."
                    : "Create an account to save your designs, checkout faster, and get exclusive offers on custom prints."}
                </p>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl backdrop-blur-md border border-white/10 w-fit">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                  </div>
                  <div className="text-sm font-medium">Premium Quality Prints</div>
                </div>
              </div>
            </div>

            {/* Right side: form area */}
            <div className="w-full md:w-7/12 p-8 sm:p-12 max-h-[90vh] overflow-y-auto">
              {/* Mobile logo fallback */}
              <div className="md:hidden mb-8 flex justify-center">
                <Image
                  src="/logo/brand-logo.png"
                  alt="Print Studio 24"
                  width={150}
                  height={60}
                  className="w-auto h-10 object-contain"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {view === "login" ? <LoginForm inModal /> : <RegisterForm inModal />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
