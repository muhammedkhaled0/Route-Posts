import Image from "next/image";
import { UserPlus } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="mx-auto lg:w-3/4 sm:w-[90%] w-[95%]  body-space">
      {/* Cover */}
      <div className="h-44 md:h-55 w-full rounded-xl bg-gradient-to-r from-[#1c395a] to-[#3a6785]" />

      {/* Card */}
      <div className="relative -mt-16 bg-white rounded-xl shadow-md px-8 py-6 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="relative">
            <Image
              src="/person.jpg"
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full border-[5px] border-white object-cover size-20"
            />
          </div>

          {/* Name */}
          <div>
            <h2 className="text-[22px] font-semibold text-slate-900">
              hadeer
            </h2>

            <p className="text-slate-500 text-sm">
              @user
            </p>
          </div>
        </div>

        {/* Follow Button */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">

          <UserPlus size={18} />

          Follow
        </button>
      </div>
    </div>
  );
}