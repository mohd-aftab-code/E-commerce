import { db } from "@/lib/prisma";
import { updateOrderStatus } from "@/features/admin/actions";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import type { OrderStatus } from "@prisma/client";

export const metadata = {
  title: "Order Details | Admin Panel",
};

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            include: {
              options: {
                include: {
                  values: true,
                },
              },
            },
          },
        },
      },
      // Since userId might be null for guests, we fetch user if it exists
    }
  });

  if (!order) return notFound();

  // We fetch the user separately if userId exists
  const customer = order.userId ? await db.user.findUnique({ where: { id: order.userId } }) : null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <Link href="/admin/orders" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Orders
        </Link>
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Order #{order.id.slice(-8).toUpperCase()}
          </h2>
          <div className="mt-4 flex items-center sm:mt-0 sm:ml-4 gap-4">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize
                ${order.status === "DELIVERED" ? "bg-green-100 text-green-800" : 
                  order.status === "PAID" || order.status === "PROCESSING" ? "bg-blue-100 text-blue-800" :
                  order.status === "CANCELLED" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                }
              `}>
              {order.status.toLowerCase().replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Left Column (Items & Status) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Status Update */}
          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Update Fulfillment Status</h3>
              <form action={async (formData) => {
                "use server";
                await updateOrderStatus(order.id, formData.get("status") as OrderStatus);
              }} className="flex items-center gap-4">
                <select
                  name="status"
                  defaultValue={order.status}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option value="PENDING_PAYMENT">Pending Payment</option>
                  <option value="PAID">Paid (Unfulfilled)</option>
                  <option value="PROCESSING">Processing (Pre-press)</option>
                  <option value="PRINTING">Printing in Progress</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="REFUNDED">Refunded</option>
                </select>
                <button
                  type="submit"
                  className="mt-1 inline-flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Update
                </button>
              </form>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Line Items</h3>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="ml-3 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h4>{item.product.name}</h4>
                          <p className="ml-4">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm mt-1">
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      {item.options && typeof item.options === 'object' && Object.keys(item.options).length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                          <ul className="list-disc pl-4 space-y-1">
                            {Object.entries(item.options as Record<string, string>).map(([optId, valId]) => {
                              const optionsArray = item.product.options as any[] | undefined;
                              const option = optionsArray?.find((o: any) => o.id === optId);
                              const value = option?.values?.find((v: any) => v.id === valId);
                              
                              if (!option || !value) return null;
                              
                              return (
                                <li key={optId}>
                                  <span className="font-medium text-gray-900">{option.name}:</span> {value.label}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                      {item.artworkUrl && (
                        <div className="mt-2">
                          <a href={item.artworkUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                            Download / View Artwork <ExternalLink size={14} className="ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <p>Order Total</p>
                  <p>{formatPrice(order.totalAmount)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Customer & Shipping) */}
        <div className="space-y-6">
          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Customer Details</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {customer ? `${customer.firstName} ${customer.lastName}` : order.shippingName || "Guest Checkout"}
                  </dd>
                </div>
                {customer && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{customer.email}</dd>
                  </div>
                )}
                {order.stripePaymentId && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Stripe Payment ID</dt>
                    <dd className="mt-1 text-xs text-gray-500 font-mono truncate" title={order.stripePaymentId}>
                      {order.stripePaymentId}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Shipping Address</h3>
              {order.shippingAddress ? (
                <div className="text-sm text-gray-900 space-y-1">
                  <p className="font-medium">{order.shippingName}</p>
                  <p>{order.shippingAddress}</p>
                  <p>{order.shippingCity}, {order.shippingState} {order.shippingZip}</p>
                  <p>United States</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No shipping details provided (Digital order or pending).</p>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
