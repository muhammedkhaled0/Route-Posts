"use client"
import { FC } from "react";
import { LoaderCircle } from "lucide-react";
interface LoadingOverlayProps {
  show: boolean;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 transition-opacity">
      <div className="flex flex-col items-center gap-4 p-6 bg-white/90 rounded-xl shadow-lg">
        <LoaderCircle className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-700 font-medium text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;