"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  src: string;
  onClose: () => void;
}

export default function LightBox({ src, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className=" fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/40"
      >
        <X size={22} />
      </button>
      <div
        className="relative h-[90vh] w-[95vw] max-w-6xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt="cover preview"
          fill
          priority
          className="object-contain rounded-xl"
        />
      </div>
    </div>
  );
}