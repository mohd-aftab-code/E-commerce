"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { AddressForm } from "@/components/forms/address-form";
import { deleteAddress, setDefaultAddress } from "@/features/customers/addresses/actions";

export function AddressesClient({ initialAddresses }: { initialAddresses: any[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this address?")) {
      await deleteAddress(id);
    }
  }

  async function handleSetDefault(id: string) {
    await setDefaultAddress(id);
  }

  const activeAddress = editingId ? initialAddresses.find(a => a.id === editingId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 rounded-xl bg-brand-primary-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-800 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Address
          </button>
        )}
      </div>

      {(isAdding || editingId) ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {isAdding ? "Add New Address" : "Edit Address"}
          </h3>
          <AddressForm 
            initialData={activeAddress} 
            onCancel={() => { setIsAdding(false); setEditingId(null); }}
            onSuccess={() => { setIsAdding(false); setEditingId(null); }}
          />
        </div>
      ) : null}

      {!isAdding && !editingId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialAddresses.length === 0 ? (
            <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <MapPin className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No addresses saved</h3>
              <p className="text-gray-500 mt-1">Add an address for faster checkout.</p>
            </div>
          ) : (
            initialAddresses.map((address) => (
              <div 
                key={address.id} 
                className={`relative bg-white p-6 rounded-2xl border ${address.isDefault ? 'border-brand-primary-900 ring-1 ring-brand-primary-900 shadow-md' : 'border-gray-200 shadow-sm'} transition-all`}
              >
                {address.isDefault && (
                  <span className="absolute -top-3 -right-3 flex items-center gap-1 bg-brand-cyan-500 text-brand-primary-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    <CheckCircle2 className="h-3 w-3" /> Default
                  </span>
                )}
                
                <div className="mb-4">
                  <p className="font-bold text-gray-900">{address.firstName} {address.lastName}</p>
                  {address.company && <p className="text-gray-600 text-sm">{address.company}</p>}
                  <p className="text-gray-600 text-sm mt-1">{address.addressLine1}</p>
                  {address.addressLine2 && <p className="text-gray-600 text-sm">{address.addressLine2}</p>}
                  <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.zipCode}</p>
                  <p className="text-gray-600 text-sm">{address.country}</p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setEditingId(address.id)}
                    className="text-sm font-semibold text-brand-primary-800 hover:text-brand-primary-600 flex items-center gap-1"
                  >
                    <Edit2 className="h-4 w-4" /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(address.id)}
                    className="text-sm font-semibold text-red-600 hover:text-red-500 flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                  {!address.isDefault && (
                    <button 
                      onClick={() => handleSetDefault(address.id)}
                      className="ml-auto text-sm font-semibold text-gray-500 hover:text-gray-900"
                    >
                      Set as default
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
