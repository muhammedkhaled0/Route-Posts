"use client";
import { useState } from "react";
import { Comment } from "../interfaces/CommentI";
import UserImage from "./UserImage";
import ReplyInput from "./ReplyInput";
import EditCommentInput from "./EditCommentInput";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { timeAgo } from "../helpers/TimeAgo";
import CommentDropDown from "./CommentDropDown";
import { putCommentLike, updateCommentsApi } from "../services/CommentServices";
import ReplySection from "./ReplySection";
import toast from "react-hot-toast";
import RepliesToggle from "./RepliesToggle";

export default function CommentItem({
  postId,
  comment,
  userId,
  postUserId,
  isNotReply,
 onNewReply,
fetchComments
}: {
  postId: string;
  comment: Comment;
  userId:string;
  postUserId:string;
  isNotReply:boolean;
  onNewReply?: (reply: any) => void;
  fetchComments:()=>void;
}) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [currentComment, setCurrentComment] = useState(comment);
  const [liked, setLiked] = useState(comment.likes.includes(userId));
const [likesCount, setLikesCount] = useState(comment.likes.length);
const [likeLoading, setLikeLoading] = useState(false);
const [replyJustAdded, setReplyJustAdded] = useState<any>(null);
const handleLike = async () => {
  if (likeLoading) return;

  try {
    setLikeLoading(true);

    // optimistic update
    setLiked((p) => !p);
    setLikesCount((c) => (liked ? c - 1 : c + 1));

    const res = await putCommentLike(postId, comment._id);

    setLiked(res.data.liked);
    setLikesCount(res.data.likesCount);
  } catch {
    toast.error("Something went wrong");

    // rollback
    setLiked((p) => !p);
    setLikesCount((c) => (liked ? c + 1 : c - 1));
  } finally {
    setLikeLoading(false);
  }
};
  return (
    <div className="flex gap-3 group">
      <UserImage src={comment.commentCreator?.photo || "/person.png"} />

      <div className="flex-1 min-w-0">
        <div className="bg-gray-100 hover:bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm transition-colors">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="font-semibold text-sm text-gray-900 leading-tight">
                {comment.commentCreator.name}
              </p>
              <span className="text-[10px] text-gray-400">
                {timeAgo(comment.createdAt)}
              </span>
            </div>
            {
              isNotReply&&
            <CommentDropDown
            userId={userId}
            postUserId={postUserId}
              postId={postId}
              comment={comment}
              onEdit={() => setEditing(true)}
              fetchComments={fetchComments}
            />
            }
          </div>

          {/* ====== Edit Mode ====== */}
{editing ? (
  <EditCommentInput
    initialValue={currentComment.content || ""}
    initialImage={currentComment.image}
    onSave={async (text, image) => {

      const formData = new FormData();
      formData.append("content", text);

      if (image) formData.append("image", image);

      const res = await updateCommentsApi(
        postId,
        currentComment._id,
        formData
      );
      setCurrentComment(res.data.comment);
      toast.success("Comment updated successfully")
      setEditing(false);
    }}
    onCancel={() => setEditing(false)}
  />
)  : (
            <>
              {currentComment.content && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {currentComment.content}
                </p>
              )}

              {currentComment.image && (
                <img
                  src={currentComment.image}
                  className="mt-2 rounded-xl max-h-44 object-cover"
                />
              )}
            </>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-3 mt-1 px-1">
          {
            isNotReply&&
          <button
            onClick={() => setReplying((p) => !p)}
            className="text-[11px] font-medium text-gray-400 hover:text-indigo-500 flex items-center gap-1 transition-colors"
          >
            <MessageCircle size={11} />
            {replying ? "Cancel" : "Reply"}
          </button>
          }
          {
isNotReply &&
<button
  onClick={handleLike}
  disabled={likeLoading}
  className={`text-[11px] flex items-center gap-1 transition
    ${liked ? "text-blue-500" : "text-gray-400 hover:text-blue-400"}
    ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}
  `}
>
  <ThumbsUp
    size={10}
    className={liked ? "fill-blue-500" : ""}
  />
  {likesCount}
</button>
          }
        </div>

{replying && isNotReply&&(
  <ReplySection
    postId={postId}
    commentId={comment._id}
    onDone={(reply) =>{
      setReplying(false)
      onNewReply?.(reply)
      setReplyJustAdded(reply);
    }
      }
  />
)}
<RepliesToggle    newReplyFromParent={replyJustAdded}   isNotReply={isNotReply} postId={postId} commentId={comment._id} userId={userId} postUserId={postUserId} repliesCount={comment.repliesCount}/>
      </div>
    </div>
  );
}