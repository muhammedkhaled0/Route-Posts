"use client"
import toast from "react-hot-toast";
import ReplyInput from "./ReplyInput";
import { useState } from "react";
import { createReplyApi } from "../services/CommentServices";

export default function ReplySection({
  postId,
  commentId,
  onDone,
}: {
  postId: string;
  commentId: string;
  onDone?: (reply: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (text: string, image?: File) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("content", text);
      if (image) formData.append("image", image);

      const res = await createReplyApi(postId, commentId, formData);

      toast.success("Reply added successfully");

      onDone?.(res.data.reply);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReplyInput
      loading={loading}
      onSubmit={handleSubmit}
      onCancel={() => {}}
    />
  );
}