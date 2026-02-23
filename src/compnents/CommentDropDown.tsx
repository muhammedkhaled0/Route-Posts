"use client";

import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Comment } from "../interfaces/CommentI";

export default function CommentDropDown({
  postId,
  postUserId,
  comment,
  onEdit,
  userId,
}: {
  postId: string;
  comment: Comment;
  onEdit: () => void;
  userId:String
  postUserId:string
}) {
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
          <button
            onClick={() => {
              setOpen(false);
              comment.content &&
                navigator.clipboard.writeText(comment.content);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
          >
            <Copy size={14} /> Copy text
          </button>
          {
            userId==comment.commentCreator._id&&<>
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
          >
            <Pencil size={14} /> Update
          </button>
          <div className="my-1 border-t border-gray-100" />
          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            <Trash2 size={14} /> Delete
          </button>
          </>
          }
        </div>
      )}
    </div>
  );
}