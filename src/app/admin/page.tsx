import { db } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { getSession } from "@/lib/session";
import { ShoppingBag, Users, Package, DollarSign, Plus, ArrowRight, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getSession();
  
  const [totalOrders, totalUsers, totalProducts] = await Promise.all([
    db.order.count(),
    db.user.count(),
    db.product.count(),
  ]);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
          Welcome back, {session?.firstName || 'Admin'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your store's performance today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 flex flex-col">
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium text-gray-500">Total Orders</dt>
            <div className="p-2 rounded-lg bg-gray-50 text-gray-400">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <dd className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{totalOrders}</dd>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 flex flex-col">
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium text-gray-500">Total Revenue</dt>
            <div className="p-2 rounded-lg bg-gray-50 text-gray-400">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <dd className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{formatPrice(0)}</dd>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 flex flex-col">
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium text-gray-500">Products</dt>
            <div className="p-2 rounded-lg bg-gray-50 text-gray-400">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <dd className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{totalProducts}</dd>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 flex flex-col">
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium text-gray-500">Customers</dt>
            <div className="p-2 rounded-lg bg-gray-50 text-gray-400">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <dd className="mt-4 text-3xl font-bold tracking-tight text-gray-900">{totalUsers}</dd>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="border-b border-gray-100 px-6 py-5">
            <h3 className="text-base font-semibold text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="p-6 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                href="/admin/products/new" 
                className="group flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 hover:border-brand-primary-900 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="rounded-lg bg-brand-primary-50 p-2 text-brand-primary-700">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-gray-900 group-hover:text-brand-primary-900">Add Product</span>
                  <span className="mt-1 block text-xs text-gray-500">Create a new item in your catalog</span>
                </div>
              </Link>
              
              <Link 
                href="/admin/orders" 
                className="group flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 hover:border-brand-primary-900 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="rounded-lg bg-brand-primary-50 p-2 text-brand-primary-700">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-gray-900 group-hover:text-brand-primary-900">Manage Orders</span>
                  <span className="mt-1 block text-xs text-gray-500">View and fulfill recent orders</span>
                </div>
              </Link>
            </div>

            <div className="mt-4">
              <Link 
                href="/admin/customers" 
                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 hover:border-brand-primary-900 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-brand-primary-50 p-2 text-brand-primary-700">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-900 group-hover:text-brand-primary-900">Customer Database</span>
                    <span className="mt-0.5 block text-xs text-gray-500">Manage your store's users</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-brand-primary-900 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Placeholder for future charts/activity */}
        <div className="rounded-xl bg-gray-50/50 border border-gray-200 border-dashed overflow-hidden flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
          <div className="rounded-full bg-white p-3 shadow-sm border border-gray-100 mb-3">
            <TrendingUp className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Analytics Overview</h3>
          <p className="text-xs text-gray-500 max-w-xs">
            Connect an analytics service or expand the database to show revenue charts and trends here.
          </p>
        </div>
      </div>
    </div>
  );
}
