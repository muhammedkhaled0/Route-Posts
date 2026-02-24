"use client";

import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Comment } from "../interfaces/CommentI";
import { deleteCommentApi } from "../services/CommentServices";
import toast from "react-hot-toast";

export default function CommentDropDown({
  postId,
  postUserId,
  comment,
  onEdit,
  userId,
  fetchComments,
}: {
  postId: string;
  comment: Comment;
  onEdit: () => void;
  userId: String;
  postUserId: string;
  fetchComments:()=>void;
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // ✅ new

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
              toast.success("Copied");
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
          >
            <Copy size={14} /> Copy text
          </button>

          {userId == comment.commentCreator._id && (
            <>
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
                disabled={isDeleting}
                onClick={async () => {
                  try {
                    setIsDeleting(true);
                    setOpen(false);

                    await deleteCommentApi(postId, comment._id);
                    toast.success("Comment deleted");
                    await fetchComments()
                  } catch (e) {
                    toast.error("Delete failed");
                  } finally {
                    setIsDeleting(false);
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={14} />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}