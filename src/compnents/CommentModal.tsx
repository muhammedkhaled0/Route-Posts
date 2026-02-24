"use client";

import { useState, useEffect } from "react";
import { Send, Image as ImageIcon, X, MessageCircle, Heart } from "lucide-react";
import { UserPostI } from "../interfaces/PostI";
import {
  createCommentsApi,
  getAllPostCommentsApi,
} from "../services/CommentServices";
import { UserI } from "../interfaces/UserI";
import Spinner from "./Spinner";
import CommentItem from "./CommentItem";
import { Comment } from "../interfaces/CommentI";
import UserImage from "./UserImage";
import toast from "react-hot-toast";
export default function CommentsModal({
  postId,
  postUser,
  onClose,
  currentUser,
  setNoOfComments
}: {
  postId: string;
  postUser: UserPostI;
  onClose: () => void;
  currentUser: UserI;
  setNoOfComments:(x:number)=>void
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  /* ================= API ================= */

  async function fetchComments() {
    setFetching(true);
    const res = await getAllPostCommentsApi(postId);
    const comments:Comment[]=res?.data?.comments 
    setComments(comments|| []);
    setFetching(false);
    return res
  }

  async function createReply(id: string, text: string, image?: File) {
    const formData = new FormData();
    if (text) formData.append("content", text);
    if (image) formData.append("image", image);
    await createCommentsApi(postId, formData);
  }

  useEffect(() => { fetchComments(); }, [postId]);

  async function handleCommentSubmit() {
    if (!text.trim() && !image) return;
    const formData = new FormData();
    if (text) formData.append("content", text);
    if (image) formData.append("image", image);
    setLoading(true);
    await createCommentsApi(postId, formData);
    setText("");
    setImage(undefined);
    const x= await fetchComments();
    
    setLoading(false);
    setNoOfComments(x?.data?.comments.length)
          toast.success("Comment added successfully")
  }

  async function handleReplySubmit(id: string, text: string, image?: File) {
    await createReply(id, text, image);
    await fetchComments();
  }

  /* ================= UI ================= */

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden"
        style={{ animation: "slideUp 0.25s cubic-bezier(0.32,0.72,0,1)" }}
      >
        {/* ── Header ── */}
        <div className="relative flex items-center justify-center px-5 py-4 border-b border-gray-100 shrink-0">
          {/* Drag handle (mobile) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-200 rounded-full sm:hidden" />

          <div className="text-center mt-2 sm:mt-0">
            <h2 className="font-bold text-gray-900 text-base leading-tight">Comments</h2>
            <p className="text-xs text-gray-400 mt-0.5">{comments.length} comment{comments.length !== 1 ? "s" : ""}</p>
          </div>

          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Comments List ── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 overscroll-contain">
          {fetching ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
              <span className="text-sm">Loading comments…</span>
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">💬</div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">No comments yet</p>
                <p className="text-xs text-gray-400 mt-0.5">Be the first to share your thoughts!</p>
              </div>
            </div>
          ) : (
            comments.map((c) => (
              <CommentItem isNotReply={true} key={c._id} comment={c} postId={postId} userId={currentUser._id} postUserId={postUser._id}/>
            ))
          )}
        </div>

        {/* ── New Comment Input ── */}
        <div className="border-t border-gray-100 bg-white px-4 pt-3 pb-4 shrink-0">
          {/* Image preview */}
          {image && (
            <div className="relative w-14 h-14 mb-2 ml-12">
              <img src={URL.createObjectURL(image)} className="w-full h-full object-cover rounded-xl" />
              <button
                onClick={() => setImage(undefined)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-end gap-3">
            <UserImage src={currentUser?.photo||'/public/person'} />

            <div className="flex-1 bg-gray-100 rounded-2xl flex items-end gap-2 px-4 py-2.5 focus-within:ring-2 focus-within:ring-indigo-400/50 focus-within:bg-white border border-transparent focus-within:border-indigo-200 transition-all">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment…"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCommentSubmit();
                  }
                }}
                onInput={(e: any) => {
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
                }}
                className="flex-1 resize-none text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400 max-h-24 leading-relaxed"
              />

              <div className="flex items-center gap-1.5 pb-0.5">
                <label className="cursor-pointer text-gray-400 hover:text-indigo-500 transition-colors p-1">
                  <ImageIcon size={16} />
                  <input hidden type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0])} />
                </label>
                <button
                  onClick={handleCommentSubmit}
                  disabled={loading || (!text.trim() && !image)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white disabled:opacity-40 hover:scale-105 active:scale-95 transition shadow-md shadow-indigo-200"
                >
                  {loading ? <Spinner small /> : <Send size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}