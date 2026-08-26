import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata = {
  title: "Checkout Cancelled | Print Studio 24",
};

export default function CheckoutCancelPage() {
  return (
    <div className="bg-white min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <XCircle className="mx-auto h-24 w-24 text-red-500 mb-8" />
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Checkout Cancelled
        </h1>
        <p className="text-xl text-gray-500 mb-12">
          Your payment was cancelled and your order has not been placed. Your items are still in your cart.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/cart"
            className="inline-flex justify-center items-center rounded-xl bg-brand-primary-900 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-800"
          >
            Return to Cart
          </Link>
          <Link
            href="/products"
            className="inline-flex justify-center items-center rounded-md bg-white px-8 py-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
