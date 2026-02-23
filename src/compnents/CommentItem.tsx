"use client"
import { useState } from "react";
import { Comment } from "../interfaces/CommentI";
import UserImage from "./UserImage";
import ReplyInput from "./ReplyInput";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { timeAgo } from "../helpers/TimeAgo";
import CommentDropDown from "./CommentDropDown";

export default function CommentItem({
  comment,
  onReplySubmit,
}: {
  comment: Comment;
  onReplySubmit: (commentId: string, text: string, image?: File) => Promise<void>;
}) {
  const [replying, setReplying] = useState(false);


  return (
    <div className="flex gap-3 group">
            <UserImage src={comment.commentCreator?.photo||'/public/person'} />
      <div className="flex-1 min-w-0">
        {/* Bubble */}
        <div className="bg-gray-100 hover:bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm transition-colors">
          <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-semibold text-sm text-gray-900 leading-tight">
              {comment.commentCreator.name}
            </p>
            <span className="text-[10px] text-gray-400">{timeAgo(comment.createdAt)}</span>
          </div>
          <CommentDropDown/>
          </div>

          {comment.content && (
            <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
          )}

          {comment.image && (
            <img src={comment.image} className="mt-2 rounded-xl max-h-44 object-cover" />
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-3 mt-1 px-1">
          <button
            onClick={() => setReplying((p) => !p)}
            className="text-[11px] font-medium text-gray-400 hover:text-indigo-500 flex items-center gap-1 transition-colors"
          >
            <MessageCircle size={11} />
            {replying ? "Cancel" : "Reply"}
          </button>

          {comment.likes?.length > 0 && (
            <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
              <ThumbsUp size={10} className="fill-blue-400 text-blue-400" />
              {comment.likes.length}
            </span>
          )}

          {comment.repliesCount > 0 && (
            <span className="text-[11px] text-gray-400">
              {comment.repliesCount} {comment.repliesCount === 1 ? "reply" : "replies"}
            </span>
          )}
        </div>

        {replying && (
          <ReplyInput
            onSubmit={async (text, image) => {
              await onReplySubmit(comment._id, text, image);
              setReplying(false);
            }}
            onCancel={() => setReplying(false)}
          />
        )}
      </div>
    </div>
  );
}