import { getSession } from "@/lib/session";
import { Package, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | Print Studio 24",
};

export default async function AccountDashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {session?.firstName}! Here is an overview of your account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-brand-primary-50 p-4 text-brand-primary-800 ring-4 ring-white shadow-sm">
              <Package size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-brand-cyan-50 p-4 text-brand-cyan-600 ring-4 ring-white shadow-sm">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Active Proofs</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mt-2 text-base font-semibold text-gray-900">No orders yet</h3>
          <p className="mt-1 text-sm text-gray-500">You haven&apos;t placed any orders with us yet.</p>
          <div className="mt-8">
            <Link
              href="/products"
              className="inline-flex items-center rounded-xl bg-brand-primary-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-900 transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
