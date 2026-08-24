import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Order Successful | Print Studio 24",
};

export default async function CheckoutSuccessPage() {
  const session = await getSession();

  return (
    <div className="bg-white min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-8" />
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-500 mb-12">
          Thank you for your business. We have received your order and are getting it ready for production.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {session ? (
            <Link
              href="/account/orders"
              className="inline-flex justify-center items-center rounded-md bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              View Order in Dashboard
            </Link>
          ) : (
            <Link
              href="/register"
              className="inline-flex justify-center items-center rounded-md bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Create Account to Track Order
            </Link>
          )}
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
