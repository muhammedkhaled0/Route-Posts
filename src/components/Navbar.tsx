'use client'
import Image from "next/image";
import logo from "@/src/app/icon.png"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, MessageCircle, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Contexts/UserContext";
import { signOut, useSession } from "next-auth/react";
import NavDropdown from "./NavDropdown";
import { getUserNotificationsCountApi } from "../services/UserServices.action";
export default function Navbar() {
  const session=useSession()
  const {user,error}=useContext(UserContext)
  const pathName=usePathname()
  const[isLoggedIn,setIsLoggedIn]=useState('')
  const [openDrop,setOpenDrop]=useState(false);
  const [notiCount,setNotiCount]=useState<null|number>(null)
  async function getNotiCount(){
    const count=await getUserNotificationsCountApi()
    setNotiCount(count)    
  }
  useEffect(()=>{
    setIsLoggedIn(session.status)
    getNotiCount()
  },[session])
  if(error){
 signOut({
              callbackUrl:'/auth'
              })
                  return
  }
  return isLoggedIn==="authenticated"?
  
   <nav className="max-w-full bg-white shadow fixed top-0 start-0 end-0 z-50 ">
    <div className="myContainer py-2 flex justify-between align-baseline">
      <div>
        <div className=" flex gap-x-3">
          <Image src={logo} alt="Route Logo" width={40} height={40} className="size-10 rounded-xl"/>
          <h1 className=" mt-1.5 font-extrabold text-xl hidden sm:block">Route Posts</h1>
        </div>
      </div>
      <div className="flex gap-x-7 font-extrabold text-sm text-gray-600 border rounded-2xl  pt-4 px-4  bg-[#f7faff] border-gray-300">
          <Link href='/' className={(pathName=='/'?"active":"")+" flex gap-x-1.5 align-baseline"}>
          <Home className='size-5'/>
          <span className="hidden sm:inline">Feed</span>
          </Link>
          <Link href='/profile' className={(pathName=='/profile'?"active":"")+ " flex gap-x-1.5 align-baseline"}>
          <User className='size-5'/>
          <span className="hidden sm:inline">Profile</span>
          </Link>
          <Link href='/notifications' className={(pathName=='/notifications'?"active":"")+ " flex gap-x-1.5 align-baseline relative"}>
          <MessageCircle className='size-5'/>
          {notiCount!=null&&<span className="bg-red-400 size-5 rounded-full text-white text-xs flex items-center justify-center absolute -top-2.5 left-2">{notiCount}</span>}
          <span className="hidden sm:inline">Notifications</span>
          </Link>
      </div>
     
          <NavDropdown user={user}/>
    </div>
  </nav>:null
}
