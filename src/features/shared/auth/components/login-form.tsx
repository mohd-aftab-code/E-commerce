"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema, type LoginInput } from "@/validations/auth";
import { loginUser } from "@/features/shared/auth/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthModal } from "@/hooks/use-auth-modal";

export function LoginForm({ inModal = false }: { inModal?: boolean }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { setView, closeModal } = useAuthModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError(null);
    const result = await loginUser(data);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      if (inModal) {
        closeModal();
      }
      
      if (result.role === "ADMIN" || result.role === "STAFF") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/account"; // Force full reload to update navbar state
      }
    }
  };

  return (
    <div className={`mx-auto w-full max-w-md space-y-6 ${inModal ? "" : "rounded-xl border border-gray-100 bg-white p-6 sm:p-8 shadow-lg"}`}>
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {!inModal && "Welcome back"}
          {inModal && "Sign in"}
        </h1>
        <p className="text-sm text-gray-500">
          Enter your email and password to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-gray-700 font-medium text-sm">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors text-sm"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-700 font-medium text-sm">Password</Label>
            <Link href="/forgot-password" className="text-xs text-brand-primary-600 hover:text-brand-primary-800 font-medium">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            className="h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors text-sm"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full h-10 text-sm font-semibold shadow-sm cursor-pointer" isLoading={isSubmitting}>
          Log in
        </Button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        <a 
          href="/api/auth/google"
          className="flex items-center justify-center w-full h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-500 transition-colors"
        >
          <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </a>
      </form>

      <div className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        {inModal ? (
          <button 
            onClick={() => setView("register")}
            className="text-brand-primary-700 font-semibold hover:underline"
          >
            Sign up
          </button>
        ) : (
          <Link href="/register" className="text-brand-primary-700 font-semibold hover:underline">
            Sign up
          </Link>
        )}
      </div>
    </div>
  );
}
