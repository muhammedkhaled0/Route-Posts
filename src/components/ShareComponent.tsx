"use client";

import { useRef, useState } from "react";
import { X, Share2, Loader2 } from "lucide-react";
import Image from "next/image";
import { UserI } from "../interfaces/UserI";
import { sharePostApi } from "../services/PostServices";
import toast from "react-hot-toast";

interface ShareComponentProps {
  postId: string;
  currentUser: UserI | null;
  onClose: () => void;
  setNoOfShares: (count: number) => void;
  sharesCount: number;
}

export default function ShareComponent({
  postId,
  currentUser,
  onClose,
  setNoOfShares,
  sharesCount
}: ShareComponentProps) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(currentUser?.photo || "/person.jpg");
  const textRef = useRef<HTMLTextAreaElement | null>(null);
async function handleShare() {
  if (isLoading) return;

  const toastId = toast.loading("Sharing post...");
  setIsLoading(true);

  try {
    const data = await sharePostApi(postId, text);
    if (data?.success==false) {
      toast.error(data.message, {
        id: toastId,
      });
      return;
    }
    if(data.success){
      setNoOfShares(sharesCount + 1);
    }
    toast.success("Post shared successfully 🎉", {
      id: toastId,
    });

  } catch (err) {
    console.error("Share failed:", err);
    toast.error("Failed to share post ❌", {
      id: toastId,
    });

  } finally {
      setIsLoading(false);
      onClose();
  }
}

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#e4e6eb]">
            <h2 className="text-[#050505] text-xl font-bold text-center flex-1">
              Share Post
            </h2>
            <button
              onClick={onClose}
              className="cursor-pointer w-9 h-9 rounded-full bg-[#e4e6eb] hover:bg-[#d8dadf] flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-[#050505]" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            {/* User Info */}
            <div className="flex items-center gap-2 mb-3">
              <Image
                src={imgSrc}
                onError={() => setImgSrc("/person.jpg")}
                width={40}
                height={40}
                alt="user photo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-[15px] font-semibold text-[#050505] leading-tight">
                  {currentUser?.name}
                </p>
                <span className="text-xs text-[#65676b]">Public</span>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              ref={textRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Say something about this..."
              rows={4}
              className="w-full resize-none outline-none text-[15px] text-[#050505] placeholder:text-[#65676b] bg-transparent"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-[#e4e6eb] mx-4" />

          {/* Footer */}
          <div className="px-4 py-3">
            <button
              onClick={handleShare}
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-[15px] transition-all
                ${
                  isLoading
                    ? "bg-[#1877f2]/60 cursor-not-allowed text-white"
                    : "bg-[#1877f2] hover:bg-[#166fe5] active:bg-[#1464d8] text-white cursor-pointer"
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sharing...
                </>
              ) : (
                <>
                  <Share2 size={18} />
                  Share Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}