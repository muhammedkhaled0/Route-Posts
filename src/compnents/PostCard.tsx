import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Globe,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { PostI } from "../interfaces/PostI";
import personImg from "@/public/person.jpg";

export default function PostCard({ post }: { post: PostI }) {
  const user = post.user ?? {};

  const username = user.name || "Unknown user";
  const handle = user.username ? `@${user.username}` : "";
  const avatarSrc = user.photo || personImg;

  const text = post.body || null;
  const imageSrc = post.image || null;

  const likes = post.likesCount ?? 0;
  const shares = post.sharesCount ?? 0;
  const comments = post.commentsCount ?? 0;

  const timeAgo = post.createdAt ? getTimeAgo(post.createdAt) : "";

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <Image
            src={avatarSrc}
            alt={username}
            width={40}
            height={40}
            className="rounded-full object-cover size-10"
          />

          {/* Meta */}
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-[#050505]">
              {username}
            </span>

            <div className="flex items-center gap-1 text-[12px] text-[#65676b]">
              {handle && <span>{handle}</span>}
              {handle && <span className="text-[6px]">·</span>}

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
      {text && (
        <p className="px-4 py-2.5 text-[15px] text-[#050505] leading-relaxed">
          {text}
        </p>
      )}

      {/* Image (اختياري) */}
      {imageSrc && (
        <div className="w-full h-[320px] relative">
          <Image src={imageSrc} alt="post image" fill className="object-cover" />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 flex justify-between items-center border-b border-[#e4e6eb]">
        <div className="flex items-center gap-1.5 text-[15px] text-[#65676b]">
          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
            <ThumbsUp size={11} className="text-white fill-white" />
          </div>
          <span>{likes} likes</span>
        </div>

        <div className="flex gap-3 text-[15px] text-[#65676b]">
          <span>{shares} shares</span>
          <span>{comments} comments</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex px-2 py-1">
        {[
          { icon: <ThumbsUp size={18} />, label: "Like" },
          { icon: <MessageCircle size={18} />, label: "Comment" },
          { icon: <Share2 size={18} />, label: "Share" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md hover:bg-gray-100 text-[#65676b] font-semibold text-[15px]"
          >
            {icon}
            {label}
          </button>
        ))}
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