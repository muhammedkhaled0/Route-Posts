"use client";

import { useState } from "react";
import { Send, X, Image as ImageIcon } from "lucide-react";

interface Props {
  initialValue: string;
  initialImage?: string;

  onSave: (text: string, image?: File | null) => Promise<void>;
  onCancel?: () => void;
}

export default function EditCommentInput({
  initialValue,
  initialImage,
  onSave,
  onCancel,
}: Props) {
  const [text, setText] = useState(initialValue);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const hasChanges =
    text !== initialValue || image !== null;

  async function handleSave() {
    if (!hasChanges) return;

    setLoading(true);
    await onSave(text, image);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-2 bg-gray-100 rounded-2xl px-4 py-3">

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Edit comment..."
        className="bg-transparent outline-none text-sm"
      />

      {/* preview old image */}
      {initialImage && !image && (
        <img
          src={initialImage}
          className="rounded-xl max-h-40 object-cover"
        />
      )}

      {/* new image */}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          className="rounded-xl max-h-40 object-cover"
        />
      )}

      <div className="flex items-center gap-2">

        <label className="cursor-pointer">
          <ImageIcon size={16} />
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
          />
        </label>

        {onCancel && (
          <button onClick={onCancel}>
            <X size={16} />
          </button>
        )}

        <button
          disabled={!hasChanges || loading}
          onClick={handleSave}
          className="p-2 rounded-full bg-purple-500 text-white disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}