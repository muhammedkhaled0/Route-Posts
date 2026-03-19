"use client"
import Image from "next/image";
import { Minus, UserPlus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createAndDeleteFollow, getUserProfileApi } from "@/src/services/UserServices.action";
import { UserResFailI, UserResSuccI } from "@/src/interfaces/UserProfileI";
import { UserContext } from "@/src/components/Contexts/UserContext";
import PostCard from "@/src/components/PostCard";
import { PostI } from "@/src/interfaces/PostI";
import { getUserPostsApi } from "@/src/services/PostServices";
import Loading from "@/src/components/Loading";
import PostSkeleton from "@/src/components/PostSkeleton";
export default function UserProfile() {
    const {user}=useContext(UserContext);
    const {userId}:{userId:string}= useParams();
    const [userPosts,setUserPosts]=useState<PostI[]|null>(null)
    const [res,setRes]=useState<UserResSuccI|UserResFailI|null>(null)
    const [loading,setLoading] = useState(false)
    const [isFollowing,setIsFollowing] = useState(false)
    async function getUser() {
        const res =await getUserProfileApi(userId)
        setRes(res);
        if(res.success){
            setIsFollowing(res.data.isFollowing)
            const posts:PostI[]=await getUserPostsApi(userId)
            setUserPosts(posts)
        }
    }
    useEffect(()=>{
        getUser()
    },[userId])
    if(!res) return <Loading/>
  return <>
  {res?.success==false?
  <div className="w-4/5 m-auto body-space bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-lg">
    {res.message}
  </div>:
      
    <div className="mx-auto lg:w-3/4 sm:w-[90%] w-[95%]  body-space">
      <div className="h-44 md:h-55 w-full rounded-xl bg-gradient-to-r from-[#1c395a] to-[#3a6785]">
              {res.data.user.cover?<Image src={res.data.user.cover} height={200} width={400} className="h-full w-full rounded-xl" alt={res.data.user.name}/>:''}
      </div>
      {/* Card */}
      <div className="relative -mt-16 bg-white rounded-xl shadow-md px-8 py-6 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="relative">
            <Image
              src={res.data.user.photo}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full border-[5px] border-white object-cover size-20"
            />
          </div>
          {/* Name */}
          <div>
            <h2 className="text-[22px] font-semibold text-slate-900">
              {res.success==true&&res.data.user.name}
            </h2>
            <p className="text-slate-500 text-sm">
              @user
            </p>
          </div>
        </div>

        {/* Follow Button */}
<button
  disabled={loading}
  onClick={async()=>{
    try{
      setLoading(true)
      const x=await createAndDeleteFollow(res.data.user._id)
     setIsFollowing(!isFollowing)

    }finally{
      setLoading(false)
    }
  }}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition
  ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}
  text-white`}
>

{loading ? (
  "Loading..."
) : (
  <>
    {isFollowing ? <Minus size={18}/> : <UserPlus size={18} />}
    {isFollowing ? "Unfollow" : "Follow"}
  </>
)}

</button>
      </div>
    </div>
  }
    {userPosts?
        <div>
            {
            userPosts.map((post)=>
                <div className="mx-auto lg:w-3/4 sm:w-[90%] w-[95%]  body-space">
                <PostCard currentUserId={user?._id} currentUser={user} post={post}/>
                </div>
            )
            }
    </div>:<PostSkeleton className="mx-auto lg:w-3/4 sm:w-[90%] w-[95%] mt-8"/>
}
  </>
}