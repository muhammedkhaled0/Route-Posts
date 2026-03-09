import { Camera, Expand, Users } from 'lucide-react';

export default function ProfileInfo({
  user,
  handlePhotoChange,
  setOpenProfile
}: any) {

  return (
    <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">

      <div className="rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7">

        <div className="flex items-end gap-4">

          <div className="group/avatar relative shrink-0">

            <button type="button" className="cursor-pointer rounded-full">
              <img
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                src={user?.photo}
                alt={user?.name}
              />
            </button>

            <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
              <Camera size={17} strokeWidth={2} />
              <input accept="image/*" className="hidden" type="file" onChange={handlePhotoChange} />
            </label>

            <button
              type="button"
              onClick={() => setOpenProfile(true)}
              className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50"
            >
              <Expand size={16} strokeWidth={2} />
            </button>

          </div>

          <div className="min-w-0 pb-1">
            <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">{user?.name}</h2>
            <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">@</p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
              <Users size={13} strokeWidth={2} />
              Route Posts member
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}