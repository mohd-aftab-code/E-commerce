"use client";

import { useActionState } from "react";
import { trackOrder } from "@/features/orders/actions";
import { FiSearch, FiPackage, FiCheckCircle, FiClock, FiTruck, FiAlertCircle } from "react-icons/fi";
import { formatPrice } from "@/lib/utils";

export function OrderTrackingForm() {
  const [state, formAction, isPending] = useActionState(trackOrder, {});

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "PENDING_PAYMENT":
        return { icon: <FiClock className="h-6 w-6 text-orange-500" />, text: "Pending Payment", color: "text-orange-700", bg: "bg-orange-50" };
      case "PAID":
      case "PROCESSING":
        return { icon: <FiCheckCircle className="h-6 w-6 text-blue-500" />, text: "Processing", color: "text-blue-700", bg: "bg-blue-50" };
      case "PRINTING":
        return { icon: <FiPackage className="h-6 w-6 text-purple-500" />, text: "In Production", color: "text-purple-700", bg: "bg-purple-50" };
      case "SHIPPED":
        return { icon: <FiTruck className="h-6 w-6 text-brand-cyan-500" />, text: "Shipped", color: "text-brand-cyan-700", bg: "bg-brand-cyan-50" };
      case "DELIVERED":
        return { icon: <FiCheckCircle className="h-6 w-6 text-green-500" />, text: "Delivered", color: "text-green-700", bg: "bg-green-50" };
      case "CANCELLED":
      case "REFUNDED":
        return { icon: <FiAlertCircle className="h-6 w-6 text-red-500" />, text: "Cancelled/Refunded", color: "text-red-700", bg: "bg-red-50" };
      default:
        return { icon: <FiClock className="h-6 w-6 text-gray-500" />, text: status, color: "text-gray-700", bg: "bg-gray-50" };
    }
  };

  return (
    <div>
      <form action={formAction} className="space-y-4 max-w-md mx-auto text-left">
        {state.error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start gap-3">
            <FiAlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{state.error}</p>
          </div>
        )}
        
        <div>
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
            Order Number
          </label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            placeholder="e.g. clk342..."
            className={`w-full rounded-xl border ${state.fieldErrors?.orderId ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-cyan-500'} px-4 py-3.5 focus:outline-none focus:ring-2 focus:border-transparent`}
          />
          {state.fieldErrors?.orderId && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.orderId[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            className={`w-full rounded-xl border ${state.fieldErrors?.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-brand-cyan-500'} px-4 py-3.5 focus:outline-none focus:ring-2 focus:border-transparent`}
          />
          {state.fieldErrors?.email && <p className="mt-1 text-xs text-red-500">{state.fieldErrors.email[0]}</p>}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-navy-900 px-4 py-4 text-white font-bold shadow-sm hover:bg-brand-royal-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : <FiSearch className="h-5 w-5" />}
          {isPending ? "Tracking..." : "Track Order"}
        </button>
      </form>

      {state.status === "success" && state.orderData && (
        <div className="mt-10 pt-8 border-t border-gray-100 text-left max-w-md mx-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Order Details</h3>
          
          <div className={`rounded-2xl p-6 ${getStatusDisplay(state.orderData.status).bg} border border-gray-100/50 flex items-start gap-4 mb-6`}>
            <div className="mt-1">
              {getStatusDisplay(state.orderData.status).icon}
            </div>
            <div>
              <p className={`font-bold ${getStatusDisplay(state.orderData.status).color}`}>
                {getStatusDisplay(state.orderData.status).text}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Your order is currently in this stage. We will notify you when it advances.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Order ID</span>
              <span className="font-semibold text-gray-900 text-sm truncate max-w-[150px]">{state.orderData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Date Placed</span>
              <span className="font-semibold text-gray-900 text-sm">{state.orderData.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Items</span>
              <span className="font-semibold text-gray-900 text-sm">{state.orderData.itemsCount} items</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">{formatPrice(state.orderData.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
