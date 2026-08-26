"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitQuoteSchema, SubmitQuoteInput } from "@/features/quotes/validations";
import { submitQuoteAction } from "@/features/quotes/actions";
import { FiPlus, FiTrash2, FiSend, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

export default function QuoteRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitQuoteInput>({
    resolver: zodResolver(submitQuoteSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      notes: "",
      items: [{ description: "", quantity: 1, targetPrice: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: SubmitQuoteInput) => {
    setIsSubmitting(true);
    setErrorMsg("");
    
    // Convert targetPrice from string to number if needed (handled by zod theoretically, but html inputs are strings)
    // Zod parsing might fail if we pass string to a number field without preprocessing, so let's format it.
    const formattedData = {
      ...data,
      items: data.items.map(item => ({
        ...item,
        quantity: Number(item.quantity),
        targetPrice: item.targetPrice ? Number(item.targetPrice) : null,
      }))
    };

    const res = await submitQuoteAction(formattedData);
    
    if (res.success) {
      setIsSuccess(true);
    } else {
      setErrorMsg(res.error || "Something went wrong.");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow rounded-lg p-8 text-center border border-gray-200">
          <FiCheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. Our team will review your request and get back to you with a custom quote shortly.
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary-600 hover:bg-brand-primary-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-200 bg-white">
          <h1 className="text-3xl font-bold text-gray-900">Request a Custom Quote</h1>
          <p className="mt-2 text-gray-600">
            Need something special or looking to order in bulk? Fill out the details below and we&apos;ll provide a custom price tailored for your business.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8 space-y-8">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                {...register("name")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-500 focus:ring-brand-primary-500 sm:text-sm border p-2"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company (Optional)</label>
              <input
                type="text"
                {...register("company")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-500 focus:ring-brand-primary-500 sm:text-sm border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-500 focus:ring-brand-primary-500 sm:text-sm border p-2"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone *</label>
              <input
                type="tel"
                {...register("phone")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-500 focus:ring-brand-primary-500 sm:text-sm border p-2"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Items Needed</h3>
              <button
                type="button"
                onClick={() => append({ description: "", quantity: 1, targetPrice: null })}
                className="inline-flex items-center text-sm font-medium text-brand-primary-600 hover:text-brand-primary-500"
              >
                <FiPlus className="mr-1 h-4 w-4" /> Add Item
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Description *</label>
                    <input
                      type="text"
                      placeholder="e.g. 500x Matte Business Cards"
                      {...register(`items.${index}.description` as const)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-500 focus:ring-brand-primary-500 sm:text-sm border p-2"
                    />
                    {errors.items?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-600">{errors.items[index]?.description?.message}</p>
                    )}
                  </div>
                  
                  <div className="w-24">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Qty *</label>
                    <input
                      type="number"
                      min="1"
                      {...register(`items.${index}.quantity` as const)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-500 focus:ring-brand-primary-500 sm:text-sm border p-2"
                    />
                  </div>

                  <div className="w-32">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Budget (¢) (Opt)</label>
                    <input
                      type="number"
                      placeholder="In Cents"
                      {...register(`items.${index}.targetPrice` as const)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-500 focus:ring-brand-primary-500 sm:text-sm border p-2"
                    />
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-6 text-gray-400 hover:text-red-500"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.items && !Array.isArray(errors.items) && (
              <p className="mt-2 text-sm text-red-600">{errors.items.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
            <textarea
              rows={4}
              {...register("notes")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-500 focus:ring-brand-primary-500 sm:text-sm border p-2"
              placeholder="Any specific delivery dates or requirements?"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-brand-primary-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-brand-primary-700 focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : (
                <>
                  Submit Request <FiSend className="ml-2 -mr-1 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
