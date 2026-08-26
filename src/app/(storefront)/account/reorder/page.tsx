import { Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { db } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { ReorderButton } from "@/components/ui/reorder-button";

export const metadata = {
  title: "1-Click Reorder | Print Studio 24",
};

export default async function ReorderDashboardPage() {
  const session = await getSession();
  if (!session) return null;

  // Fetch only delivered/shipped orders for reordering
  const orders = await db.order.findMany({
    where: { 
      userId: session.userId,
      status: {
        in: ["DELIVERED", "SHIPPED", "PAID"]
      }
    },
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
        <h1 className="text-2xl font-bold text-gray-900">1-Click Reorder</h1>
        <p className="mt-1 text-sm text-gray-500">
          Quickly reorder your past purchases with a single click. Perfect for businesses needing regular stock of business cards, flyers, or banners.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-4 text-sm font-bold text-gray-900">No past orders available for reorder</h3>
          <p className="mt-1 text-sm text-gray-500">
            Once you complete an order, it will appear here for easy 1-click reordering.
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-flex items-center rounded-md bg-brand-primary-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-primary-900"
            >
              Browse Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            order.items.map((item) => (
              <div key={`${order.id}-${item.id}`} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center p-4">
                  {item.product.imageUrl ? (
                     <Image src={item.product.imageUrl} alt={item.product.name} width={200} height={150} className="object-contain h-full w-full" />
                  ) : (
                     <Package className="h-12 w-12 text-gray-300" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                       <h3 className="font-bold text-gray-900 line-clamp-1">{item.product.name}</h3>
                       <span className="font-semibold text-brand-primary-800">{formatPrice(item.price)}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="mt-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                      From Order #{order.id.slice(-8).toUpperCase()} • {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-gray-100">
                     <div className="w-full">
                       <ReorderButton orderId={order.id} className="w-full bg-brand-primary-50 text-brand-primary-800 hover:bg-brand-primary-100 ring-0 border border-brand-primary-200" />
                     </div>
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
      )}
    </div>
  );
}
