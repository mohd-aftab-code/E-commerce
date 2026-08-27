import { getCoupons, toggleCouponStatus, deleteCoupon } from "@/features/admin/coupon-actions";
import Link from "next/link";
import { Plus, Tag, Trash2, Power } from "lucide-react";

export const metadata = {
  title: "Coupons | Admin",
};

export default async function AdminCouponsPage() {
  const coupons = await getCoupons();

  async function handleToggle(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const isActive = formData.get("isActive") === "true";
    await toggleCouponStatus(id, !isActive);
  }

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteCoupon(id);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Tag className="w-8 h-8 text-brand-primary-900" />
          Discount Coupons
        </h1>
        <Link 
          href="/admin/coupons/new"
          className="inline-flex items-center gap-2 bg-brand-primary-900 text-white px-4 py-2 rounded-lg hover:bg-brand-primary-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Coupon
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        {coupons.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Tag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No coupons found.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono font-bold text-brand-primary-900">{coupon.code}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {coupon.discountType === "PERCENTAGE" 
                      ? `${coupon.discountValue}% OFF` 
                      : `$${(coupon.discountValue / 100).toFixed(2)} OFF`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {coupon.timesUsed} / {coupon.usageLimit ? coupon.usageLimit : "∞"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      coupon.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {coupon.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <form action={handleToggle}>
                        <input type="hidden" name="id" value={coupon.id} />
                        <input type="hidden" name="isActive" value={String(coupon.isActive)} />
                        <button type="submit" className={`transition-colors cursor-pointer ${coupon.isActive ? "text-green-500 hover:text-green-700" : "text-red-500 hover:text-red-700"}`} title="Toggle Status">
                          <Power className="w-5 h-5" />
                        </button>
                      </form>
                      
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={coupon.id} />
                        <button type="submit" className="text-red-400 hover:text-red-600 transition-colors cursor-pointer" title="Delete">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
