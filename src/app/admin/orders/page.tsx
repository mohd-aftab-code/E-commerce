import { db } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";

export const metadata = {
  title: "Manage Orders | Admin Panel",
};

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
      _count: {
        select: { items: true }
      }
    }
  });

  const userIds = orders.map((o) => o.userId).filter(Boolean) as string[];
  const users = await db.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, firstName: true, lastName: true, email: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u]));

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Orders
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            A list of all customer orders. Click on an order to view details and update its fulfillment status.
          </p>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Customer</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Order ID</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-sm text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const user = order.userId ? userMap.get(order.userId) : null;
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      {user ? (
                        <div>
                          <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-medium text-gray-900">{order.shippingName || "Guest"}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{order.guestEmail || "No email"}</div>
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                      {order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {formatDate(order.createdAt, { hour: 'numeric', minute: '2-digit' })}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {order._count.items}
                    </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                      ${order.status === "DELIVERED" ? "bg-green-100 text-green-800" : 
                        order.status === "PAID" || order.status === "PROCESSING" ? "bg-blue-100 text-blue-800" :
                        order.status === "CANCELLED" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                      }
                    `}>
                      {order.status.toLowerCase().replace('_', ' ')}
                    </span>
                  </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                        <Eye size={16} className="mr-1" /> View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
