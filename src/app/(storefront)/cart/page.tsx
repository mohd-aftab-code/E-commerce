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
    <div className="bg-[#f7f9fb] min-h-screen">
      <div className="mx-auto max-w-[1536px] px-4 pt-10 pb-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-primary-900 sm:text-5xl mb-10">
          Shopping Cart
        </h1>

        {isEmpty ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm border border-gray-100 max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold text-brand-primary-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 text-lg">Ready to print something amazing?</p>
            <Link
              href="/products"
              className="inline-flex rounded-xl bg-brand-primary-800 px-8 py-3.5 text-base font-bold text-white shadow-md hover:bg-brand-primary-900 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-start gap-10 lg:gap-12 xl:gap-16">
            
            {/* Cart Items List */}
            <section className="lg:col-span-7 xl:col-span-8">
              <ul role="list" className="divide-y divide-gray-100 border-t border-b border-gray-100 bg-white shadow-sm rounded-2xl overflow-hidden">
                {cart?.items.map((item) => (
                  <li key={item.id} className="relative flex flex-col sm:flex-row py-6 px-4 sm:px-8 hover:bg-gray-50/50 transition-colors gap-6">
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm">
                         {item.product.imageUrl ? (
                           // eslint-disable-next-line @next/next/no-img-element
                           <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" />
                         ) : (
                           <span className="text-xs text-gray-400">No Image</span>
                         )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-lg font-bold text-brand-primary-900">
                              <Link href={`/products/${item.product.slug}`} className="hover:text-brand-primary-700 transition-colors">
                                {item.product.name}
                              </Link>
                            </h3>
                          </div>
                          <p className="mt-1.5 text-sm font-medium text-gray-500">
                            Quantity: <span className="text-brand-primary-900 font-bold">{item.quantity}</span>
                          </p>
                          <div className="mt-3 text-xs text-gray-600 bg-[#f8f9fa] rounded-lg p-3.5 border border-gray-100 inline-block w-full sm:w-auto">
                            <ul className="space-y-1.5">
                              {Object.entries(item.options as Record<string, string>).map(([optId, valId]) => {
                                const option = item.product.options?.find((o: any) => o.id === optId);
                                const value = option?.values?.find((v: any) => v.id === valId);
                                
                                if (!option || !value) return null;
                                
                                return (
                                  <li key={optId} className="flex items-center gap-2">
                                    <span className="font-bold text-gray-700">{option.name}:</span>
                                    <span className="text-gray-600">{value.label}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9 text-left sm:text-right flex flex-col justify-between">
                          <p className="text-xl font-extrabold text-brand-primary-900">{formatPrice(item.price)}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between sm:mt-0 sm:absolute sm:right-6 sm:top-6">
                        <form action={handleRemove} className="w-full sm:w-auto">
                          <input type="hidden" name="itemId" value={item.id} />
                          <button type="submit" className="w-full sm:w-auto p-3 sm:p-2 rounded-xl sm:rounded-full text-red-500 bg-red-50 hover:bg-red-100 transition-all flex items-center justify-center gap-2 group font-semibold text-sm">
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                            <span className="sm:hidden">Remove Item</span>
                          </button>
                        </form>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order Summary */}
            <section className="mt-10 sm:mt-16 lg:col-span-5 xl:col-span-4 lg:mt-0 sticky top-32">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl shadow-brand-primary-900/5 border border-gray-100">
                <h2 className="text-xl font-extrabold text-brand-primary-900 mb-6 border-b border-gray-100 pb-4">
                  Order Summary
                </h2>

                <dl className="space-y-5 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <dt className="font-medium">Subtotal</dt>
                    <dd className="font-bold text-gray-900">{formatPrice(totalAmount)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center font-medium">
                      <span>Shipping</span>
                    </dt>
                    <dd className="font-medium text-gray-400 italic">Calculated at checkout</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-5">
                    <dt className="text-lg font-extrabold text-brand-primary-900">Total</dt>
                    <dd className="text-2xl font-extrabold text-brand-primary-800">{formatPrice(totalAmount)}</dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <form action={handleCheckout}>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-brand-cyan-500 px-4 py-4 text-base font-extrabold text-brand-primary-900 shadow-md hover:bg-brand-cyan-400 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Proceed to Checkout
                    </button>
                  </form>
                </div>
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
