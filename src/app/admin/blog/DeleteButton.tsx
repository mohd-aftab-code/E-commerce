"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton() {
  return (
    <button
      type="submit"
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
      title="Delete"
      onClick={(e) => {
        if (!confirm("Are you sure you want to delete this post?")) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
