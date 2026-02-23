"use client"
import { ImageIcon, Send } from "lucide-react";
import { useState } from "react";
import Spinner from "./Spinner";
export default function ReplyInput({
  onSubmit,
  onCancel,
}: {
  onSubmit: (text: string, image?: File) => Promise<void>;
  onCancel: () => void;
}) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!text.trim() && !image) return;
    setLoading(true);
    await onSubmit(text, image);
    setLoading(false);
    setText("");
    setImage(undefined);
  }

  return (
    <div className="mt-2 ml-1 flex flex-col gap-1.5 animate-in slide-in-from-top-1 fade-in duration-150">
      {image && (
        <div className="relative w-16 h-16 ml-1">
          <img src={URL.createObjectURL(image)} className="w-full h-full object-cover rounded-xl" />
          <button
            onClick={() => setImage(undefined)}
            className="absolute -top-1 -right-1 w-4 h-4 bg-gray-700 text-white rounded-full flex items-center justify-center text-[9px]"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-3 py-1.5 gap-2 shadow-sm">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
            placeholder="Write a reply…"
            className="flex-1 text-xs outline-none bg-transparent text-gray-800 placeholder-gray-400"
          />
          <label className="cursor-pointer text-gray-400 hover:text-indigo-500 transition-colors">
            <ImageIcon size={13} />
            <input hidden type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0])} />
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || (!text.trim() && !image)}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white disabled:opacity-40 shadow-md hover:scale-105 active:scale-95 transition"
        >
          {loading ? <Spinner small /> : <Send size={11} />}
        </button>
        <button onClick={onCancel} className="text-[11px] text-gray-400 hover:text-gray-600 transition">
          Cancel
        </button>
      </div>
    </div>
  );
}
