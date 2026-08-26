"use client";

import { useState } from "react";
import { updateLeadStatus, deleteLead } from "@/features/admin/actions";
import { Trash2 } from "lucide-react";

export function LeadActions({ leadId, currentStatus, leadName }: { leadId: string; currentStatus: string; leadName: string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setIsUpdating(true);
    await updateLeadStatus(leadId, e.target.value);
    setIsUpdating(false);
  }

  async function handleDelete() {
    if (confirm(`Are you sure you want to delete the lead from ${leadName}?`)) {
      setIsDeleting(true);
      await deleteLead(leadId);
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-3 justify-end">
      <select
        disabled={isUpdating || isDeleting}
        value={currentStatus}
        onChange={handleStatusChange}
        className="block rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 disabled:opacity-50 cursor-pointer"
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="CLOSED">Closed</option>
      </select>
      
      <button
        onClick={handleDelete}
        disabled={isUpdating || isDeleting}
        className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50 cursor-pointer"
        title="Delete Lead"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete {leadName}</span>
      </button>
    </div>
  );
}
