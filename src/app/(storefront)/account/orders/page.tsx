import { Package, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { db } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { ReorderButton } from "@/components/ui/reorder-button";

export const metadata = {
  title: "Order History | Print Studio 24",
};

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) return null;

  const orders = await db.order.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <p className="mt-1 text-sm text-gray-500">
          View your past orders, track shipments, and review details.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Looks like you haven&apos;t placed any orders yet.
            </p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center rounded-md bg-brand-primary-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="grid grid-cols-2 gap-6 sm:flex sm:gap-12">
                  <div>
                    <p className="text-xs font-medium uppercase text-gray-500">Order Placed</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-gray-500">Total</p>
                    <p className="text-sm font-medium text-gray-900">{formatPrice(order.totalAmount)}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-xs font-medium uppercase text-gray-500">Order #</p>
                    <p className="text-sm font-medium text-gray-900">{order.id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-3">
                  <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize w-fit
                    ${order.status === "DELIVERED" ? "bg-green-100 text-green-800" : 
                      order.status === "PAID" || order.status === "PROCESSING" ? "bg-blue-100 text-blue-800" :
                      order.status === "CANCELLED" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    }
                  `}>
                    {order.status.toLowerCase().replace('_', ' ')}
                  </span>
                  
                  {order.status === "DELIVERED" || order.status === "SHIPPED" ? (
                     <ReorderButton orderId={order.id} />
                  ) : null}
                </div>
              </div>
              
              <div className="px-6 py-4">
                <h4 className="sr-only">Items</h4>
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-4">
                      <div className="h-16 w-16 flex-shrink-0 rounded-md border border-gray-200 bg-gray-100 flex justify-center items-center overflow-hidden">
                        {item.product.imageUrl ? (
                          <Image src={item.product.imageUrl} alt={item.product.name} width={64} height={64} className="h-full w-full object-cover object-center" />
                        ) : (
                          <Package className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-center">
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <p>{item.product.name}</p>
                          <p>{formatPrice(item.price)}</p>
                        </div>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        {item.artworkUrl && (
                          <a href={item.artworkUrl} target="_blank" rel="noreferrer" className="inline-flex items-center mt-1 text-xs text-brand-primary-800 hover:underline">
                            <ExternalLink size={12} className="mr-1" /> View Artwork
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
