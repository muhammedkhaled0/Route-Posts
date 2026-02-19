'use client'
import Image from "next/image";
import logo from "@/src/app/icon.png"
import HomeIcon from "./icons/HomeIcon";
import Link from "next/link";
import PersonIcon from "./icons/PersonIcon";
import MessageIcon from "./icons/MessageIcon";
import BarIcon from "./icons/BarIcon";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathName=usePathname()
  return <nav className="bg-white shadow fixed top-0 start-0 end-0 z-50 ">
    <div className="myContainer py-2 flex justify-between align-baseline">
      <div>
        <div className=" flex gap-x-3">
          <Image src={logo} alt="Route Logo" width={40} height={40} className="size-10 rounded-xl"/>
          <h1 className=" mt-1.5 font-extrabold text-xl hidden sm:block">Route Posts</h1>
        </div>
      </div>
      <div className="flex gap-x-7 font-extrabold text-sm text-gray-600 border rounded-2xl pt-3 px-4  bg-[#f7faff] border-gray-300">
          <Link href='/' className={(pathName=='/'?"active":"")+" flex gap-x-1.5 align-baseline"}>
          <HomeIcon className='size-5'/>
          <span className="hidden sm:inline">Feed</span>
          </Link>
          <Link href='/profile' className={(pathName=='/profile'?"active":"")+ " flex gap-x-1.5 align-baseline"}>
          <PersonIcon className='size-5'/>
          <span className="hidden sm:inline">Profile</span>
          </Link>
          <Link href='/notifications' className={(pathName=='/notifications'?"active":"")+ " flex gap-x-1.5 align-baseline"}>
          <MessageIcon className='size-5'/>
          <span className="hidden sm:inline">Notifications</span>
          </Link>
      </div>
      <div className="p-2 flex align-baseline gap-x-2 border rounded-2xl bg-[#f7faff] border-gray-300">
          <Image src={logo} width={40} height={40} alt='User Photo' className="size-7 rounded-full"/>
          <span className="text-sm font-extrabold text-gray-800 mt-1 hidden md:inline">Muhammed</span>
          <BarIcon className='size-3 mt-2'/>
      </div>
    </div>
  </nav>
}
