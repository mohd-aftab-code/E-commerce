import { notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Package, Clock, Truck, CheckCircle, FileText, Printer } from "lucide-react";
import Image from "next/image";
import { ArtworkUploader } from "@/features/artwork/components/ArtworkUploader";

export default async function CustomerOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // In a real app, verify the user is logged in and owns this order.
  const order = await db.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
          artworks: true, // we added this relation
        }
      },
      shipments: true,
    }
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/account/orders" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(-8).toUpperCase()}</h1>
          <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link href={`/invoice/${order.id}`} target="_blank" className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-brand-primary-700 transition-colors shadow-sm" title="Print Invoice">
            <Printer className="w-5 h-5" />
          </Link>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider bg-brand-primary-50 text-brand-primary-700 border border-brand-primary-100">
            {order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Order Items & Artwork */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Items Ordered</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {order.items.map(item => {
                const artwork = item.artworks?.[0]; // Get latest artwork
                
                return (
                  <div key={item.id} className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden relative flex-shrink-0 border border-gray-200">
                        {item.product.images && (item.product.images as any)[0] ? (
                          <Image src={(item.product.images as any)[0]} alt={item.product.name} fill className="object-cover" />
                        ) : (
                          <Package className="w-8 h-8 text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{item.product.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                            
                            {/* Artwork Status Section */}
                            <div className="mt-4">
                              {artwork ? (
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      artwork.status === 'APPROVED' ? 'bg-green-100 text-green-600' :
                                      artwork.status === 'REJECTED' ? 'bg-red-100 text-red-600' :
                                      'bg-amber-100 text-amber-600'
                                    }`}>
                                      <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">Artwork: {artwork.fileName}</p>
                                      <p className={`text-xs font-bold uppercase mt-0.5 ${
                                        artwork.status === 'APPROVED' ? 'text-green-600' :
                                        artwork.status === 'REJECTED' ? 'text-red-600' :
                                        'text-amber-600'
                                      }`}>
                                        Status: {artwork.status}
                                      </p>
                                    </div>
                                  </div>
                                  <a href={artwork.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-primary-600 hover:underline font-medium">View File</a>
                                </div>
                              ) : (
                                <div className="mt-2">
                                  <ArtworkUploader orderItemId={item.id} />
                                </div>
                              )}
                            </div>

                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">${(item.price * item.quantity / 100).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${((order.totalAmount + order.discountTotal) / 100).toFixed(2)}</span>
              </div>
              {order.discountTotal > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>-${(order.discountTotal / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-[#F3552F]">${(order.totalAmount / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-gray-400" /> Shipping Info
            </h2>
            {order.shippingName ? (
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{order.shippingName}</p>
                <p>{order.shippingAddress}</p>
                <p>{order.shippingCity}, {order.shippingState} {order.shippingZip}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No shipping info provided.</p>
            )}

            {order.shipments.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">Shipments</h3>
                {order.shipments.map(ship => (
                  <div key={ship.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm mb-2">
                    <p className="font-medium text-gray-900">{ship.carrier}</p>
                    <p className="text-gray-500 mt-1">Tracking: <span className="font-mono text-gray-800">{ship.trackingNumber}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
