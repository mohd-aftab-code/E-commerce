import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatPrice, formatDate } from "@/lib/utils";
import { QuoteItem } from "@prisma/client";

type QuoteStatus = "PENDING" | "REVIEWING" | "QUOTED" | "ACCEPTED" | "REJECTED";
import { updateQuoteStatusAction } from "@/features/quotes/actions";
import { FiArrowLeft } from "react-icons/fi";

export default async function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const quote = await db.quote.findUnique({
    where: { id: resolvedParams.id },
    include: { items: true },
  });

  if (!quote) return notFound();

  return (
    <div className="space-y-8 w-full">
      <div>
        <Link href="/admin/quotes" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-4">
          <FiArrowLeft className="mr-1 h-4 w-4" /> Back to Quotes
        </Link>
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Quote Request #{quote.id.slice(-8).toUpperCase()}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Submitted on {formatDate(quote.createdAt, { hour: "numeric", minute: "2-digit" })}
            </p>
          </div>
          <div className="mt-4 flex items-center sm:mt-0 sm:ml-4 gap-4">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize
                ${quote.status === "ACCEPTED" ? "bg-green-100 text-green-800" : 
                  quote.status === "QUOTED" ? "bg-blue-100 text-blue-800" :
                  quote.status === "REJECTED" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                }
              `}>
              {quote.status.toLowerCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Left Column (Items & Status) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Update */}
          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Update Quote Status</h3>
              <form action={async (formData) => {
                "use server";
                const status = formData.get("status") as QuoteStatus;
                const totalAmountStr = formData.get("totalAmount") as string;
                const totalAmount = totalAmountStr ? Math.round(parseFloat(totalAmountStr) * 100) : undefined;
                await updateQuoteStatusAction({ id: quote.id, status, totalAmount });
              }} className="space-y-4">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      defaultValue={quote.status}
                      className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-brand-primary-500 focus:outline-none focus:ring-brand-primary-500 sm:text-sm"
                    >
                      <option value="PENDING">Pending (New)</option>
                      <option value="REVIEWING">Reviewing</option>
                      <option value="QUOTED">Quoted (Sent to Customer)</option>
                      <option value="ACCEPTED">Accepted by Customer</option>
                      <option value="REJECTED">Rejected / Closed</option>
                    </select>
                  </div>
                  <div className="w-48">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Quoted Price ($)</label>
                    <input
                      name="totalAmount"
                      type="number"
                      step="0.01"
                      defaultValue={quote.totalAmount ? quote.totalAmount / 100 : ""}
                      className="block w-full rounded-md border border-gray-300 py-2 px-3 text-base focus:border-brand-primary-500 focus:outline-none focus:ring-brand-primary-500 sm:text-sm"
                      placeholder="e.g. 150.00"
                    />
                  </div>
                  <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-brand-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-primary-700">
                    Update Quote
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Requested Items</h3>
              <ul className="divide-y divide-gray-200">
                {quote.items.map((item: QuoteItem) => (
                  <li key={item.id} className="py-4 flex">
                    <div className="ml-3 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h4>{item.description}</h4>
                          {item.targetPrice && (
                            <p className="ml-4 text-sm text-gray-500">Target: {formatPrice(item.targetPrice)}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm mt-1">
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {quote.notes && (
            <div className="bg-white shadow sm:rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Customer Notes</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{quote.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (Customer Details) */}
        <div className="space-y-6">
          <div className="bg-white shadow sm:rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Customer Details</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{quote.name}</dd>
                </div>
                {quote.company && (
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Company</dt>
                    <dd className="mt-1 text-sm text-gray-900">{quote.company}</dd>
                  </div>
                )}
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a href={`mailto:${quote.email}`} className="text-brand-primary-600 hover:underline">{quote.email}</a>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{quote.phone}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
