export default function StatsSection({ user }: any) {

  return (
    <div className="grid w-full grid-cols-3 gap-2 lg:w-[520px]">

      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Followers</p>
        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{user?.followersCount}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Following</p>
        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{user?.followingCount}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Bookmarks</p>
        <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{user?.bookmarksCount}</p>
      </div>

    </div>
  )
}