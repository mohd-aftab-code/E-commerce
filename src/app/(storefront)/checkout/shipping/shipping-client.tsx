"use client";

import { useState } from "react";
import { MapPin, Plus, CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { AddressForm } from "@/components/forms/address-form";
import Link from "next/link";

export function ShippingClient({ initialAddresses, isLoggedIn }: { initialAddresses: any[], isLoggedIn: boolean }) {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    initialAddresses.length > 0 ? (initialAddresses.find(a => a.isDefault)?.id || initialAddresses[0].id) : null
  );
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleContinue() {
    if (!selectedAddressId) return;
    setIsSubmitting(true);
    
    // We navigate to /api/checkout and pass the selectedAddressId
    // Because /api/checkout handles the Stripe session creation
    window.location.href = `/api/checkout?addressId=${selectedAddressId}`;
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sign in to continue</h2>
        <p className="text-gray-500 mb-6">Please sign in or create an account to save your shipping address and check out.</p>
        <Link 
          href="/login?callbackUrl=/checkout/shipping"
          className="inline-block rounded-xl bg-brand-primary-900 px-6 py-3 text-sm font-bold text-white hover:bg-brand-primary-800 transition-colors"
        >
          Sign In / Register
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isAdding ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Address</h3>
          <AddressForm 
            onCancel={() => setIsAdding(false)}
            onSuccess={() => {
              setIsAdding(false);
              // In a real app we might want to refresh the addresses, 
              // but Server Actions revalidatePath so the page will automatically refresh with the new address
            }}
          />
        </div>
      ) : (
        <>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Select Shipping Address</h2>
              <button
                onClick={() => setIsAdding(true)}
                className="text-sm font-semibold text-brand-primary-800 hover:text-brand-primary-600 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add New
              </button>
            </div>

            {initialAddresses.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">You don't have any saved addresses.</p>
                <button
                  onClick={() => setIsAdding(true)}
                  className="mt-4 rounded-xl bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Add an Address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {initialAddresses.map((address) => (
                  <label 
                    key={address.id} 
                    className={`relative flex cursor-pointer rounded-2xl border p-4 shadow-sm focus:outline-none ${
                      selectedAddressId === address.id 
                        ? 'border-brand-primary-900 ring-1 ring-brand-primary-900 bg-brand-primary-50/30' 
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="address" 
                      value={address.id}
                      checked={selectedAddressId === address.id}
                      onChange={() => setSelectedAddressId(address.id)}
                      className="sr-only" 
                    />
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className="font-bold text-gray-900">
                            {address.firstName} {address.lastName}
                            {address.isDefault && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-brand-cyan-100 px-2 py-0.5 text-xs font-medium text-brand-primary-900">
                                Default
                              </span>
                            )}
                          </p>
                          <div className="text-gray-500 mt-1">
                            <p>{address.addressLine1} {address.addressLine2}</p>
                            <p>{address.city}, {address.state} {address.zipCode}</p>
                          </div>
                        </div>
                      </div>
                      <CheckCircle2 
                        className={`h-6 w-6 ${selectedAddressId === address.id ? 'text-brand-primary-900' : 'text-transparent'}`} 
                      />
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <Link href="/cart" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
              Return to cart
            </Link>
            
            <button
              onClick={handleContinue}
              disabled={!selectedAddressId || isSubmitting}
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-brand-cyan-500 px-8 py-3.5 text-base font-extrabold text-brand-primary-900 shadow-md hover:bg-brand-cyan-400 hover:-translate-y-0.5 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Continue to Payment
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
