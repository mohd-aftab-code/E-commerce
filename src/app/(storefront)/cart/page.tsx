import { getCart, removeCartItem } from "@/features/storefront/cart/actions";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Trash2, ShieldCheck, CreditCard } from "lucide-react";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Your Cart | Print Studio 24",
};

export default async function CartPage() {
  const cart = await getCart();
  
  const totalAmount = cart ? cart.items.reduce((sum, item) => sum + item.price, 0) : 0;
  const isEmpty = !cart || cart.items.length === 0;

  // Inline server action for remove
  async function handleRemove(formData: FormData) {
    "use server";
    const itemId = formData.get("itemId") as string;
    await removeCartItem(itemId);
  }

  // Inline server action to start Stripe Checkout
  async function handleCheckout() {
    "use server";
    if (totalAmount === 0) return;
    
    // Will redirect to the API route which creates the Stripe Session
    redirect("/api/checkout");
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-10">
          Shopping Cart
        </h1>

        {isEmpty ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Ready to print something amazing?</p>
            <Link
              href="/products"
              className="inline-flex rounded-md bg-brand-royal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy-900 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            
            {/* Cart Items List */}
            <section className="lg:col-span-7">
              <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200 bg-white shadow-sm rounded-2xl overflow-hidden">
                {cart?.items.map((item) => (
                  <li key={item.id} className="relative flex py-6 px-4 sm:px-6 hover:bg-gray-50/50 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="h-28 w-28 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm">
                         {item.product.imageUrl ? (
                           // eslint-disable-next-line @next/next/no-img-element
                           <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" />
                         ) : (
                           <span className="text-xs text-gray-400">No Image</span>
                         )}
                      </div>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-base font-bold text-gray-900">
                              <Link href={`/products/${item.product.slug}`} className="hover:text-brand-royal-600 transition-colors">
                                {item.product.name}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-500">
                            Quantity: <span className="text-gray-900 font-bold">{item.quantity}</span>
                          </p>
                          <div className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-100 inline-block">
                            <ul className="space-y-1">
                              {Object.entries(item.options as Record<string, string>).map(([optId, valId]) => {
                                const option = item.product.options?.find((o: any) => o.id === optId);
                                const value = option?.values?.find((v: any) => v.id === valId);
                                
                                if (!option || !value) return null;
                                
                                return (
                                  <li key={optId} className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-700">{option.name}:</span>
                                    <span className="text-gray-600">{value.label}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9 text-right flex flex-col justify-between">
                          <p className="text-lg font-extrabold text-brand-navy-900">{formatPrice(item.price)}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between sm:mt-0 sm:absolute sm:right-6 sm:top-6">
                        <form action={handleRemove}>
                          <input type="hidden" name="itemId" value={item.id} />
                          <button type="submit" className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center group">
                            <span className="sr-only">Remove</span>
                            <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                          </button>
                        </form>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order Summary */}
            <section className="mt-16 rounded-2xl bg-white px-4 py-8 sm:p-8 lg:col-span-5 lg:mt-0 shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-xl font-extrabold text-brand-navy-900 mb-6 flex items-center gap-2">
                Order Summary
              </h2>

              <dl className="space-y-5 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-semibold text-gray-900">{formatPrice(totalAmount)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <dt className="flex items-center text-sm">
                    <span>Shipping estimate</span>
                  </dt>
                  <dd className="font-medium text-gray-500 italic">Calculated at checkout</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <dt className="flex items-center text-sm">
                    <span>Tax estimate</span>
                  </dt>
                  <dd className="font-medium text-gray-500 italic">Calculated at checkout</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-5 mt-5">
                  <dt className="text-lg font-extrabold text-gray-900">Order Total</dt>
                  <dd className="text-xl font-extrabold text-brand-royal-600">{formatPrice(totalAmount)}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <form action={handleCheckout}>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand-cyan-500 px-4 py-4 text-base font-bold text-brand-navy-900 shadow-md hover:bg-brand-cyan-400 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Checkout securely
                  </button>
                </form>
              </div>

              <div className="mt-6 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  Secure SSL Checkout
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Your payment information is processed securely by Stripe. We do not store credit card details.
                </p>
              </div>
            </section>
            
          </div>
        )}
      </div>
    </div>
  );
}
