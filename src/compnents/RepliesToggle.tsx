"use client";
import { useState, useEffect } from "react";
import { getAllCommentsRepliesApi } from "../services/CommentServices";
import CommentItem from "./CommentItem";
import Spinner from "./Spinner";

export default function RepliesToggle({
  postId,
  commentId,
  userId,
  postUserId,
  repliesCount,
  isNotReply,
  newReplyFromParent
}: {
  postId: string;
  commentId: string;
  userId: string;
  postUserId: string;
  repliesCount: number;
  isNotReply: boolean;
  newReplyFromParent?: any; // reply جديد إذا أضيف
}) {
  const [loading, setLoading] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<any[]>([]);
  const [count, setCount] = useState(repliesCount);

  // مراقبة الردود الجديدة
  useEffect(() => {
    if (newReplyFromParent) {
      setReplies((prev) => [newReplyFromParent, ...prev]);
      setCount((c) => c + 1);
      if (!showReplies) setShowReplies(true); // افتح الردود لو كانت مغلقة
    }
  }, [newReplyFromParent]);

  const handleToggle = async () => {
    if (!showReplies && replies.length === 0) {
      setLoading(true);
      const res = await getAllCommentsRepliesApi(postId, commentId);
      setReplies(res.data.replies);
      setLoading(false);
    }
    setShowReplies((p) => !p);
  };

  return (
    <div className="mt-1 ml-6">
      {count > 0 && (
        <button
          onClick={handleToggle}
          className="text-xs text-gray-400 hover:text-indigo-500"
        >
          {showReplies && isNotReply ? "Hide replies" : `Show replies (${count})`}
        </button>
      )}

      {loading && <Spinner />}

      {showReplies && isNotReply && !loading && (
        <div className="flex flex-col gap-2 mt-2">
          {replies.map((reply: any) => (
            <CommentItem
              key={reply._id}
              postId={postId}
              comment={reply}
              userId={userId}
              postUserId={postUserId}
              isNotReply={false}
              onNewReply={() => {}} // ممكن تسيبه فاضي للردود التانية
            />
          ))}
        </div>
      )}
    </div>
  );
}