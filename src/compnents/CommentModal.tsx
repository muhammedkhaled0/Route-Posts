"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Image,
  X,
  Smile,
  Trash2,
  Flag,
  Copy,
  ThumbsUp,
} from "lucide-react";
import { UserPostI } from "../interfaces/PostI";
import { UserI } from "../interfaces/UserI";

// -------- Types --------
type Reply = {
  id: number;
  author: string;
  avatarColor: string;
  content: string;
  time: string;
};

type Comment = {
  id: number;
  author: string;
  avatarColor: string;
  content: string;
  time: string;
  likes: number;
  liked: boolean;
  replies: Reply[];
};

// -------- Initial Comments --------
const initialComments: Comment[] = [
  {
    id: 1,
    author: "muhammed",
    avatarColor: "from-violet-500 to-indigo-600",
    content: "Hello world!",
    time: "6 minutes ago",
    likes: 0,
    liked: false,
    replies: [],
  },
  {
    id: 2,
    author: "muhammed",
    avatarColor: "from-violet-500 to-indigo-600",
    content: "Another comment",
    time: "7 minutes ago",
    likes: 0,
    liked: false,
    replies: [],
  },
];

function Avatar({ name, gradient, size = "md" }: { name: string; gradient: string; size?: "sm" | "md" }) {
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm" };
  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shrink-0 ring-2 ring-white shadow-sm`}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

// -------- Dropdown Menu --------
function DropdownMenu({ onDelete, onReport, onCopy }: { onDelete: () => void; onReport: () => void; onCopy: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(p => !p)} className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-50 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden">
          <button onClick={() => { onCopy(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Copy size={14} /> Copy
          </button>
          <button onClick={() => { onReport(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Flag size={14} /> Report
          </button>
          <div className="my-1 border-t border-gray-100" />
          <button onClick={() => { onDelete(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// -------- Comment Item --------
function CommentItem({ comment, onLike, onDelete, onReply }: { comment: Comment; onLike: (id: number) => void; onDelete: (id: number) => void; onReply: (id: number, text: string) => void }) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setReplying(false);
  };

  return (
    <div className="group">
      <div className="flex gap-3">
        <Avatar name={comment.author} gradient={comment.avatarColor} />
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900 text-sm">{comment.author}</span>
              <span className="text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">member</span>
            </div>
            <p className="text-gray-700 text-sm">{comment.content}</p>
          </div>

          <div className="flex items-center gap-4 mt-1.5 px-1 text-xs text-gray-400">
            <span>{comment.time}</span>
            <button onClick={() => onLike(comment.id)} className={`${comment.liked ? "text-blue-500" : "hover:text-blue-400"}`}>
              <ThumbsUp size={13} className={`${comment.liked ? "fill-blue-500" : ""}`} /> {comment.likes} Likes
            </button>
            <button onClick={() => setReplying(p => !p)} className="hover:text-indigo-500 flex items-center gap-1">
              <MessageCircle size={13} /> Reply
            </button>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu
                onDelete={() => onDelete(comment.id)}
                onReport={() => {}}
                onCopy={() => navigator.clipboard.writeText(comment.content)}
              />
            </div>
          </div>

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="mt-3 space-y-3 pl-2 border-l-2 border-indigo-100">
              {comment.replies.map(r => (
                <div key={r.id} className="flex gap-2">
                  <Avatar name={r.author} gradient={r.avatarColor} size="sm" />
                  <div>
                    <div className="bg-indigo-50 rounded-2xl rounded-tl-sm px-3 py-2">
                      <span className="font-semibold text-gray-900 text-xs mr-2">{r.author}</span>
                      <span className="text-gray-700 text-xs">{r.content}</span>
                    </div>
                    <span className="text-xs text-gray-400 px-1 mt-0.5 block">{r.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply Input */}
          {replying && (
            <div className="mt-3 flex gap-2 items-center">
              <Avatar name="muhammed" gradient="from-violet-500 to-indigo-600" size="sm" />
              <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                <input
                  autoFocus
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleReply()}
                  placeholder="Write a reply..."
                  className="flex-1 text-xs outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
                <button onClick={handleReply} disabled={!replyText.trim()} className="p-1 rounded-full text-indigo-500 hover:text-indigo-600 disabled:opacity-30">
                  <Send size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default function CommentsModal({ onClose,Commentuser,currentUser }: { onClose: () => void,Commentuser:UserPostI,currentUser:UserI|null }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleLike = (id: number) => {
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c))
    );
  };

  const handleDelete = (id: number) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const handleReply = (commentId: number, text: string) => {
    setComments(prev =>
      prev.map(c =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                { id: Date.now(), author: "muhammed", avatarColor: "from-violet-500 to-indigo-600", content: text, time: "just now" },
              ],
            }
          : c
      )
    );
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    setComments(prev => [
      ...prev,
      {
        id: Date.now(),
        author: "muhammed",
        avatarColor: "from-violet-500 to-indigo-600",
        content: newComment,
        time: "just now",
        likes: 0,
        liked: false,
        replies: [],
      },
    ]);
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden" style={{ maxHeight: "90vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-base">Comments ({comments.length})</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Comments */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {comments.length === 0 && <p className="text-center text-gray-400">No comments yet.</p>}
          {comments.map(c => (
            <CommentItem key={c.id} comment={c} onLike={handleLike} onDelete={handleDelete} onReply={handleReply} />
          ))}
        </div>

        {/* New Comment */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-end gap-3">
            <Avatar name="muhammed" gradient="from-violet-500 to-indigo-600" />
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Write a comment..."
                rows={1}
                className="w-full resize-none px-4 pt-3 pb-1 text-sm text-gray-700 outline-none bg-transparent"
              />
              <div className="flex items-center justify-end px-3 pb-2">
                <button onClick={handleSubmit} disabled={!newComment.trim()} className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-sm disabled:opacity-30">
                  <Send size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}