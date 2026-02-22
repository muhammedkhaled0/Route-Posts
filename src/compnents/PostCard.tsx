"use client"
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Globe,
  MoreHorizontal,
  Repeat,
} from "lucide-react";
import Image from "next/image";
import { PostI } from "../interfaces/PostI";
import { createAndDeleteLike } from "../services/LikeServices";
import { useState } from "react";
import { LikeResI } from "../interfaces/LikeI";

export default function PostCard({ post,currentUserId }: { post: PostI,currentUserId:any }) {
  const userId = post.user._id ??'';
  const [noOfLikes,setNoOfLikes] =useState(post.likesCount);
  const [noOfComments,setNoOfComments] =useState(post.commentsCount);
  const [noOfShares,setNoOfShers] =useState(post.sharesCount);
  const [isLiked,setIsLiked] =useState(post.likes?.some(id => id === currentUserId));
  const timeAgo = post.createdAt ? getTimeAgo(post.createdAt) : "";
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <Image
               src={post?.user.photo||'/person.jpg'}
            alt={post.user.name}
            width={40}
            height={40}
            className="rounded-full object-cover size-10"
          />

          {/* Meta */}
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-[#050505]">
              {post.user.name}
            </span>

            <div className="flex items-center gap-1 text-[12px] text-[#65676b]">
              {post.user.name && <span>{post.user.name}</span>}
              {post.user.name && <span className="text-[6px]">·</span>}

              {timeAgo && <span>{timeAgo}</span>}
              {timeAgo && <span className="text-[6px]">·</span>}

              <Globe size={12} />
              <span>{post.privacy}</span>
            </div>
          </div>
        </div>

        <button className="p-1.5 rounded-full hover:bg-gray-100 text-[#65676b]">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Body (اختياري) */}
      {post.body && (
        <p className="px-4 py-2.5 text-[15px] text-[#050505] leading-relaxed">
          {post.body}
        </p>
      )}

      {/* Image (اختياري) */}
      {post.image && (
        <div className="w-full h-[320px] relative">
          <Image src={post.image} alt="post image" fill className="object-cover" />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 flex justify-between items-center border-b border-[#e4e6eb]">
        <div className="flex items-center gap-1.5 text-[15px] text-[#65676b]">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
            <ThumbsUp size={11} className="text-white fill-white" />
          </div>
          {<span>{noOfLikes} likes</span>}
        </div>

        <div className="flex gap-3 text-[15px] text-[#65676b]" >
          <span className="flex "> <Repeat className="size-3 mt-1.5 me-1.5 text-gray-500" /> {noOfShares} shares</span>
          <span>{noOfComments} comments</span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex px-2 py-1">
          <button
            className="flex-1 flex items-center gap-1.5 py-2 rounded-md text-[#65676b] font-semibold text-[15px]"
          >
            <button onClick={async()=>{
              const x:LikeResI=await createAndDeleteLike(post._id)      
              setIsLiked(x.data.liked)
              setNoOfLikes(x.data.likesCount)
              }} className={ isLiked?"cursor-pointer w-1/3 justify-center flex gap-x-3 text-blue-500 py-1 rounded bg-blue-50 ":"cursor-pointer w-1/3 justify-center flex gap-x-3 py-1  hover:bg-gray-100 "  }>
            <ThumbsUp/>
            Like
            </button>
            <div className="cursor-pointer py-1 rounded flex justify-center gap-x-3  hover:bg-gray-100 w-1/3">
            <MessageCircle/>
            Comment
            </div>
            <div className="cursor-pointer py-1 rounded flex justify-center hover:bg-gray-100 w-1/3 text-center">
            <Share2/>
            Share
            </div>
          </button>
  
      </div>
    </div>
  );
}

/* =========================
   Helper
========================= */
function getTimeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();

  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m`;

  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;

  const d = Math.floor(h / 24);
  return `${d}d`;
}