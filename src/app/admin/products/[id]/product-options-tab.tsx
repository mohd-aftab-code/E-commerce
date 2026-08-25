"use client";

import { useState } from "react";
import { saveProductOptions } from "@/features/admin/actions";
import { FiPlus, FiTrash2 } from "react-icons/fi";

type OptionValue = {
  id: string;
  label: string;
  priceModifier: string;
  isDefault: boolean;
  sortOrder: number;
};

type ProductOption = {
  id: string;
  name: string;
  type: string;
  isRequired: boolean;
  sortOrder: number;
  values: OptionValue[];
};

export function ProductOptionsTab({ productId, initialOptions }: { productId: string, initialOptions: any[] }) {
  const [options, setOptions] = useState<ProductOption[]>(
    initialOptions.map((opt: any, i) => ({
      id: opt.id || Math.random().toString(),
      name: opt.name,
      type: opt.type,
      isRequired: opt.isRequired,
      sortOrder: opt.sortOrder || i,
      values: opt.values.map((v: any, j: number) => ({
        id: v.id || Math.random().toString(),
        label: v.label,
        priceModifier: (v.priceModifier / 100).toFixed(2),
        isDefault: v.isDefault,
        sortOrder: v.sortOrder || j,
      }))
    }))
  );
  const [isLoading, setIsLoading] = useState(false);

  const addOption = () => {
    setOptions([...options, {
      id: Math.random().toString(),
      name: "",
      type: "SELECT",
      isRequired: true,
      sortOrder: options.length,
      values: []
    }]);
  };

  const removeOption = (id: string) => {
    setOptions(options.filter(o => o.id !== id));
  };

  const updateOption = (id: string, field: keyof ProductOption, value: any) => {
    setOptions(options.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const addValue = (optionId: string) => {
    setOptions(options.map(o => {
      if (o.id === optionId) {
        return {
          ...o,
          values: [...o.values, {
            id: Math.random().toString(),
            label: "",
            priceModifier: "0.00",
            isDefault: false,
            sortOrder: o.values.length
          }]
        };
      }
      return o;
    }));
  };

  const removeValue = (optionId: string, valueId: string) => {
    setOptions(options.map(o => {
      if (o.id === optionId) {
        return { ...o, values: o.values.filter(v => v.id !== valueId) };
      }
      return o;
    }));
  };

  const updateValue = (optionId: string, valueId: string, field: keyof OptionValue, val: any) => {
    setOptions(options.map(o => {
      if (o.id === optionId) {
        return {
          ...o,
          values: o.values.map(v => v.id === valueId ? { ...v, [field]: val } : v)
        };
      }
      return o;
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Convert string fields to expected types
    const validOptions = options.map(o => ({
      id: o.id.includes(".") ? undefined : o.id, // Random IDs have '.', valid CUIDs don't
      name: o.name,
      type: o.type,
      isRequired: o.isRequired,
      sortOrder: o.sortOrder,
      values: o.values.map(v => ({
        id: v.id.includes(".") ? undefined : v.id,
        label: v.label,
        priceModifier: Math.round(parseFloat(v.priceModifier || "0") * 100),
        isDefault: v.isDefault,
        sortOrder: v.sortOrder,
      }))
    }));

    const result = await saveProductOptions(productId, validOptions);
    if (!result.success) {
      alert(result.error);
    } else {
      alert("Product options saved successfully!");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Product Options</h3>
        <p className="mt-1 text-sm text-gray-500">
          Define customizable attributes like Size, Paper Stock, and Finish.
        </p>
      </div>

      <div className="space-y-6">
        {options.map((option, index) => (
          <div key={option.id} className="bg-white border border-gray-200 shadow-sm sm:rounded-lg p-6 relative">
            <div className="absolute top-4 right-4">
              <button
                type="button"
                onClick={() => removeOption(option.id)}
                className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-md"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 mb-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Option Name</label>
                <input
                  type="text"
                  value={option.name}
                  onChange={(e) => updateOption(option.id, "name", e.target.value)}
                  placeholder="e.g., Size"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={option.type}
                  onChange={(e) => updateOption(option.id, "type", e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm bg-white"
                >
                  <option value="SELECT">Dropdown (Select)</option>
                  <option value="RADIO">Radio Buttons</option>
                </select>
              </div>
              <div className="sm:col-span-1 flex items-center pt-6">
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={option.isRequired}
                    onChange={(e) => updateOption(option.id, "isRequired", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Required</span>
                </label>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Values</h4>
              <div className="grid grid-cols-12 gap-4 mb-2 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Label</div>
                <div className="col-span-4">Added Cost ($)</div>
                <div className="col-span-2 text-center">Default</div>
                <div className="col-span-1"></div>
              </div>
              
              <div className="space-y-2">
                {option.values.map((val) => (
                  <div key={val.id} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={val.label}
                        onChange={(e) => updateValue(option.id, val.id, "label", e.target.value)}
                        placeholder="e.g., Small"
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-4 relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        value={val.priceModifier}
                        onChange={(e) => updateValue(option.id, val.id, "priceModifier", e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        className="block w-full rounded-md border border-gray-300 pl-7 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                      <input
                        type="radio"
                        name={`default-${option.id}`}
                        checked={val.isDefault}
                        onChange={() => {
                          // Make this the only default
                          option.values.forEach(v => {
                            updateValue(option.id, v.id, "isDefault", v.id === val.id);
                          });
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeValue(option.id, val.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addValue(option.id)}
                className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-900 font-medium"
              >
                <FiPlus className="mr-1" /> Add Value
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={addOption}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FiPlus className="-ml-1 mr-2 h-4 w-4 text-gray-500" />
          Add Another Option
        </button>
      </div>

      <div className="pt-5 border-t border-gray-200 flex justify-end gap-3">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Options"}
        </button>
      </div>
    </div>
  );
}
