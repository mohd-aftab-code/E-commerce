import type { Metadata } from "next";
import { FiPackage, FiSearch } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Order Tracking | Print Studio 24",
};

export default function OrderTrackingPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
          <div className="mx-auto h-16 w-16 bg-brand-navy-50 rounded-full flex items-center justify-center mb-6">
            <FiPackage className="h-8 w-8 text-brand-navy-900" />
          </div>
          <h1 className="text-3xl font-extrabold text-brand-navy-900 mb-4">Track Your Order</h1>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Enter your order number and email address below to see the current status of your printing order.
          </p>
          
          <form className="space-y-4 max-w-md mx-auto text-left">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                Order Number
              </label>
              <input
                type="text"
                id="orderId"
                placeholder="e.g. PS24-10293"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-brand-navy-900 px-4 py-3 text-white font-bold shadow-sm hover:bg-brand-royal-600 transition-colors"
            >
              <FiSearch className="h-5 w-5" />
              Track Order
            </button>
          </form>

          <div className="mt-8 text-sm text-gray-500 border-t border-gray-100 pt-8">
            Need help finding your order number? Check the confirmation email we sent you when you placed the order, or <a href="/contact" className="text-brand-primary-800 font-semibold hover:underline">contact our support team</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
