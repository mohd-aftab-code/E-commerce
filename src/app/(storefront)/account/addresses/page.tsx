import { getUserAddresses } from "@/features/customers/addresses/actions";
import { AddressesClient } from "./addresses-client";

export const metadata = {
  title: "My Addresses | Print Studio 24",
};

export default async function AddressesPage() {
  const addresses = await getUserAddresses();

  return (
    <div className="space-y-6">
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-extrabold text-brand-primary-900 tracking-tight">Address Book</h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage your saved shipping addresses for a faster checkout experience.
        </p>
      </div>

      <AddressesClient initialAddresses={addresses} />
    </div>
  );
}
