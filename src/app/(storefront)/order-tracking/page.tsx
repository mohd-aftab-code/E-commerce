import type { Metadata } from "next";
import { FiPackage } from "react-icons/fi";
import { OrderTrackingForm } from "./order-tracking-form";

export const metadata: Metadata = {
  title: "Order Tracking | Print Studio 24",
};

export default function OrderTrackingPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-primary-600 to-brand-cyan-500" />
          
          <div className="mx-auto h-16 w-16 bg-brand-primary-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-brand-primary-50/50">
            <FiPackage className="h-8 w-8 text-brand-primary-800" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Enter your order number and email address below to see the current status of your printing order.
          </p>
          
          <OrderTrackingForm />

          <div className="mt-8 text-sm text-gray-500 border-t border-gray-100 pt-8">
            Need help finding your order number? Check the confirmation email we sent you when you placed the order, or <a href="/contact" className="text-brand-primary-800 font-semibold hover:underline">contact our support team</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
