import { getUserAddresses } from "@/features/customers/addresses/actions";
import { getCart } from "@/features/storefront/cart/actions";
import { redirect } from "next/navigation";
import { ShippingClient } from "./shipping-client";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Shipping Address | Print Studio 24",
};

export default async function CheckoutShippingPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login?callbackUrl=/checkout/shipping");
  }
  const cart = await getCart();
  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const addresses = session ? await getUserAddresses() : [];

  return (
    <div className="bg-[#f7f9fb] min-h-screen pt-10 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-primary-900 mb-8">
          Shipping Address
        </h1>
        
        <ShippingClient 
          initialAddresses={addresses} 
          isLoggedIn={!!session}
        />
      </div>
    </div>
  );
}
