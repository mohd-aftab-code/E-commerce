"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, type AddressFormValues } from "@/validations/address";
import { createAddress, updateAddress } from "@/features/customers/addresses/actions";

interface AddressFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddressForm({ initialData, onSuccess, onCancel }: AddressFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData ? {
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      company: initialData.company || "",
      addressLine1: initialData.addressLine1,
      addressLine2: initialData.addressLine2 || "",
      city: initialData.city,
      state: initialData.state,
      zipCode: initialData.zipCode,
      country: initialData.country || "US",
      isDefault: initialData.isDefault || false,
    } : {
      country: "US",
      isDefault: false
    }
  });

  async function onSubmit(data: AddressFormValues) {
    setIsPending(true);
    setError("");

    try {
      let result;
      if (initialData?.id) {
        result = await updateAddress(initialData.id, data);
      } else {
        result = await createAddress(data);
      }

      if (result.error) {
        setError(result.error);
      } else if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <input
            {...register("firstName")}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-900 focus:ring-brand-primary-900 sm:text-sm px-3 py-2 border"
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <input
            {...register("lastName")}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-900 focus:ring-brand-primary-900 sm:text-sm px-3 py-2 border"
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company (Optional)</label>
        <input
          {...register("company")}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-900 focus:ring-brand-primary-900 sm:text-sm px-3 py-2 border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Street Address *</label>
        <input
          {...register("addressLine1")}
          type="text"
          placeholder="123 Main St"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-900 focus:ring-brand-primary-900 sm:text-sm px-3 py-2 border"
        />
        {errors.addressLine1 && <p className="mt-1 text-xs text-red-600">{errors.addressLine1.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Apartment, suite, etc. (Optional)</label>
        <input
          {...register("addressLine2")}
          type="text"
          placeholder="Apt 4B"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-900 focus:ring-brand-primary-900 sm:text-sm px-3 py-2 border"
        />
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">City *</label>
          <input
            {...register("city")}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-900 focus:ring-brand-primary-900 sm:text-sm px-3 py-2 border"
          />
          {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
        </div>
        <div className="col-span-3 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">State *</label>
          <input
            {...register("state")}
            type="text"
            placeholder="FL"
            maxLength={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-900 focus:ring-brand-primary-900 sm:text-sm px-3 py-2 border uppercase"
          />
          {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>}
        </div>
        <div className="col-span-3 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">ZIP Code *</label>
          <input
            {...register("zipCode")}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary-900 focus:ring-brand-primary-900 sm:text-sm px-3 py-2 border"
          />
          {errors.zipCode && <p className="mt-1 text-xs text-red-600">{errors.zipCode.message}</p>}
        </div>
      </div>

      <div className="flex items-center">
        <input
          {...register("isDefault")}
          type="checkbox"
          id="isDefault"
          className="h-4 w-4 rounded border-gray-300 text-brand-primary-900 focus:ring-brand-primary-900"
        />
        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
          Set as default shipping address
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex justify-center rounded-xl bg-brand-primary-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-800 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Saving..." : initialData ? "Update Address" : "Save Address"}
        </button>
      </div>
    </form>
  );
}
