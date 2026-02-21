"use client"
import { ImagePlay, Smile, Send } from "lucide-react";
import { useState } from "react";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data" 
export default function AddPostFooter() {
      const [open, setOpen] = useState(false)
  return (
    <>
      <div className="h-px bg-gray-200 mx-0 my-2" />

      <div className="flex items-center justify-between py-1">
        {/* Actions */}
        <div className="flex gap-1">
 <input
        id="media-upload"
        type="file"
        accept="image/*,video/*"
        className="hidden"
      />

      {/* same UI exactly */}
      <label
        htmlFor="media-upload"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-500 cursor-pointer"
      >
        <ImagePlay className="w-5 h-5 text-green-500" />
        <span className="text-green-600">Photo/video</span>
      </label>
 <div className="relative">
      {/* نفس الـ UI بالظبط */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-500 cursor-pointer"
      >
        <Smile className="w-5 h-5 text-yellow-400" />
        <span className="text-yellow-500">Feeling/activity</span>
      </button>

      {open && (
        <div className="absolute top-12 z-50">
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => {
              console.log(emoji.native) // الإيموجي المختار
              setOpen(false)
            }}
          />
        </div>
      )}
    </div>
        </div>

        {/* Post Button */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
          Post
          <Send className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}