import { db } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { LeadActions } from "./lead-actions";

export const metadata = {
  title: "Manage Leads | Admin Panel",
};

export default async function AdminLeadsPage() {
  const leads = await db.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 w-full">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Leads & Inquiries
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            A list of all customer inquiries and leads submitted from the storefront.
          </p>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Contact Details</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Message</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-gray-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {lead.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div>{lead.email}</div>
                    {lead.phone && <div className="text-xs text-gray-400 mt-0.5">{lead.phone}</div>}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate" title={lead.message}>
                    {lead.message}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatDate(lead.createdAt)}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <LeadActions leadId={lead.id} currentStatus={lead.status} leadName={lead.name} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
