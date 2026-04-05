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
import { useContext, useState } from "react";
import { LikeResI } from "../interfaces/LikeI";
import CommentsModal from "./CommentModal";
import { UserI } from "../interfaces/UserI";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { timeAgo } from "../helpers/TimeAgo";
import ShareComponent from "./ShareComponent";
import { UserContext } from "./Contexts/UserContext";
export default function PostCard({ post,currentUserId,currentUser,className }
  : { post: PostI,currentUserId:any,currentUser:UserI|null,className?:string }) {
  const pathname = usePathname();
  const [isLiking, setIsLiking] = useState(false);
  const isProfile = pathname.includes("profile");
  const [showComments, setShowComments] = useState(false);
  const handleOpen = () => setShowComments(true);
  const handleClose = () => setShowComments(false); 
  const [noOfLikes,setNoOfLikes] =useState(post.likesCount);
  const [noOfComments,setNoOfComments] =useState(post.commentsCount);
  const [noOfShares,setNoOfShares] =useState(post.sharesCount);
  const [isShared,setIsShared] =useState(false);
  const [showShare, setShowShare] = useState(false);
  const [imgSrc, setImgSrc] = useState(post?.user.photo || "/person.jpg");
  const [isLiked,setIsLiked] =useState(post.likes?.some(id => id === currentUserId));
  const timeAgoo = post.createdAt ? timeAgo(post.createdAt) : "";
  const {user}=useContext(UserContext)

  if (post.isShare && post.sharedPost) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">

      <div className="flex items-center gap-2 px-4 pt-3">
        {user?._id==post.user._id?
        
   <Link href={'/profile/'}>
           <Image
          src={post.user.photo || "/person.jpg"}
          width={40}
          height={40}
          alt="user"
          className="size-8 rounded-full"
        />
   </Link>
   :
   <Link href={'/profile/' + post.user._id}>
           <Image
          src={post.user.photo || "/person.jpg"}
          width={40}
          height={40}
          alt="user"
          className="size-8 rounded-full"
        />
   </Link>
        
         }
        <div className="text-sm">
        {user?._id==post.user._id?
        
   <Link href={'/profile/'}>
          <span className="font-semibold">{post.user.name}</span>{" "}

   </Link>
   :
   <Link href={'/profile/' + post.user._id}>
         <span className="font-semibold">{post.user.name}</span>{" "}
   </Link>
        
         }

          <span className="text-gray-500">shared a post</span>
        </div>

      </div>
      <p className="px-4 mt-1 text-gray-800">{post?.body}</p>
      <div className="mt-2 border-t">
        <PostCard
          post={post.sharedPost}
          currentUserId={currentUserId}
          currentUser={currentUser}
          className="border-none shadow-none"
        />
      </div>
    </div>
  );
}
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <Link  href={currentUser?._id==post.user._id?'/profile':`/profile/${post.user._id}`}>
            <Image
      src={imgSrc}
      onError={() => setImgSrc("/person.jpg")}
      width={50}
      height={50}
      alt="user photo"
      className="size-8 rounded-full"
    />
          </Link>
          {/* Meta */}
          <div className="flex flex-col">
          <Link  href={currentUser?._id==post.user._id?'/profile':`/profile/${post.user._id}`}>
            <span className="text-[15px] font-semibold text-[#050505]">
              {post.user.name}
            </span>
            </Link>
            <div className="flex items-center gap-1 text-[12px] text-[#65676b]">
              {post.user.name && <span>{post.user.name}</span>}
              {post.user.name && <span className="text-[6px]">·</span>}

              {timeAgoo && <span>{timeAgoo}</span>}
              {timeAgoo && <span className="text-[6px]">·</span>}

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
        <div className={`w-full relative ${
            isProfile ? "lg:h-[600px] md:h-[500px] sm:h-[400px] h-[350px]" : "h-[350px]"
          }`}>
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
          <div
            className="flex-1 flex items-center gap-1.5 py-2 rounded-md text-[#65676b] font-semibold text-[15px]"
          >
            <button  
             disabled={isLiking} 
              onClick={async () => {
    if (isLiking) return;

    setIsLiking(true);
    try {
      const x: LikeResI = await createAndDeleteLike(post._id);
      setIsLiked(x.data.liked);
      setNoOfLikes(x.data.likesCount);
    } finally {
      setIsLiking(false);
    }
  }}
         className={`w-1/3 justify-center flex gap-x-3 py-1 rounded 
    ${isLiked ? "text-blue-500 bg-blue-50" : "hover:bg-gray-100"}
    ${isLiking ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `}>
            <ThumbsUp/>
            Like
            </button>
            <div className="cursor-pointer py-1 rounded flex justify-center gap-x-3  hover:bg-gray-100 w-1/3" onClick={handleOpen}>
            <MessageCircle/>
            Comment
            </div>
<div
  onClick={() => setShowShare(true)}
  className="cursor-pointer py-1 rounded flex justify-center hover:bg-gray-100 w-1/3 text-center gap-x-3"
>
  <Share2 />
  Share
</div>
          </div>
{showComments && post?.user && currentUser&&(
  <CommentsModal postUser={post?.user}  postId={post?._id} onClose={ handleClose} currentUser={currentUser} setNoOfComments={setNoOfComments}/>
)}
{showShare && currentUser && (
  <ShareComponent
    postId={post._id}
    currentUser={currentUser}
    onClose={() => setShowShare(false)}
    setNoOfShares={setNoOfShares}  
     sharesCount={noOfShares} 
  />
)}
      </div>
    </div>
  );
}

