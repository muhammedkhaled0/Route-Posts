import { Camera, Expand } from 'lucide-react';
import Image from 'next/image';

export default function CoverSection({
  user,
  previewCover,
  isUploadingCover,
  handleCoverChange,
  handleCoverSave,
  handleCoverDiscard,
  setOpenCover
}: any) {

  return (
    <div className="group/cover relative from-gray-600 to-gray-800 h-44 sm:h-52 lg:h-60 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)]">

      {previewCover ? (
        <img src={previewCover} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        user?.cover && <Image src={user.cover} alt="cover" fill priority className="object-cover" />
      )}

      <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100">

        {!previewCover &&
          <label className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
            <Camera size={13} strokeWidth={2} />
            {user?.cover ? "Change Cover" : "Add Cover"}
            <input accept="image/*" className="hidden" type="file" onChange={handleCoverChange} />
          </label>
        }

        {user?.cover && !previewCover &&
          <button type="button" onClick={() => setOpenCover(true)} className="pointer-events-auto inline-flex items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
            <Expand size={13} strokeWidth={2} />
            View cover
          </button>
        }

        {previewCover &&
          <>
            <button onClick={handleCoverSave} disabled={isUploadingCover} className="pointer-events-auto rounded-lg bg-blue-600 px-5 py-2 cursor-pointer text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60">
              {isUploadingCover ? "Saving..." : "Save"}
            </button>

            <button onClick={handleCoverDiscard} disabled={isUploadingCover} className="pointer-events-auto rounded-lg px-5 py-2 cursor-pointer text-xs font-bold text-gray-700 hover:bg-gray-200 bg-gray-300 disabled:opacity-60">
              Discard
            </button>
          </>
        }

      </div>
    </div>
  )
}