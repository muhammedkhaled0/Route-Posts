"use client"

import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CommentDropDown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-50 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden">
          <button onClick={() => setOpen((p) => !p)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Copy size={14} /> Copy text
          </button>
          <button onClick={() => setOpen((p) => !p)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Pencil size={14} />Update
          </button>
          <div className="my-1 border-t border-gray-100" />
          <button onClick={() => setOpen((p) => !p)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  )
}