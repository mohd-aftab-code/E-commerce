import { db } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, Users, Package, DollarSign } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [totalOrders, totalUsers, totalProducts] = await Promise.all([
    db.order.count(),
    db.user.count(),
    db.product.count(),
  ]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-gray-200">
          <dt className="truncate text-sm font-medium text-gray-500 flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-gray-400" />
            Total Orders
          </dt>
          <dd className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{totalOrders}</dd>
        </div>

        {/* Metric 2 */}
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-gray-200">
          <dt className="truncate text-sm font-medium text-gray-500 flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-gray-400" />
            Total Revenue
          </dt>
          <dd className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{formatPrice(0)}</dd>
        </div>

        {/* Metric 3 */}
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-gray-200">
          <dt className="truncate text-sm font-medium text-gray-500 flex items-center">
            <Package className="mr-2 h-5 w-5 text-gray-400" />
            Products
          </dt>
          <dd className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{totalProducts}</dd>
        </div>

        {/* Metric 4 */}
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-gray-200">
          <dt className="truncate text-sm font-medium text-gray-500 flex items-center">
            <Users className="mr-2 h-5 w-5 text-gray-400" />
            Customers
          </dt>
          <dd className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">{totalUsers}</dd>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Quick Actions */}
        <div className="overflow-hidden rounded-lg bg-white shadow border border-gray-200">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li>
                <Link href="/admin/products/new" className="text-sm font-medium text-brand-primary-800 hover:text-brand-primary-600">
                  + Add new product
                </Link>
              </li>
              <li>
                <Link href="/admin/orders" className="text-sm font-medium text-brand-primary-800 hover:text-brand-primary-600">
                  View recent orders
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
