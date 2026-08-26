"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema, type RegisterInput } from "@/validations/auth";
import { registerUser } from "@/features/shared/auth/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthModal } from "@/hooks/use-auth-modal";

export function RegisterForm({ inModal = false }: { inModal?: boolean }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { setView, closeModal } = useAuthModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setError(null);
    const result = await registerUser(data);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      if (inModal) {
        closeModal();
      }
      window.location.href = "/account"; // Force full reload to update navbar state
    }
  };

  return (
    <div className={`mx-auto w-full max-w-md space-y-8 ${inModal ? "" : "rounded-2xl border border-gray-100 bg-white p-10 shadow-xl"}`}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {!inModal && "Create an account"}
          {inModal && "Sign up"}
        </h1>
        <p className="text-gray-500">
          Enter your details to create your Print Studio 24 account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2.5">
            <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
            <Input id="firstName" className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
            <Input id="lastName" className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
          <Input id="password" type="password" className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
          <Input id="confirmPassword" type="password" className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-colors" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full h-12 text-base font-semibold shadow-sm" isLoading={isSubmitting}>
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        {inModal ? (
          <button 
            onClick={() => setView("login")}
            className="text-brand-primary-700 font-semibold hover:underline"
          >
            Log in
          </button>
        ) : (
          <Link href="/login" className="text-brand-primary-700 font-semibold hover:underline">
            Log in
          </Link>
        )}
      </div>
    </div>
  );
}
