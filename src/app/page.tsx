"use client"
import Image from "next/image";
import Logo from "@/src/app/icon.png"
import Dropdown from "../compnents/Dropdown";
import { useEffect, useState } from "react";
import PrivacyDropdown from "../compnents/PrivacyDropdown";
import Textarea from "../compnents/Textarea";
import AddPostFooter from "../compnents/AddPostFooter";
import SuggestedFriends from "../compnents/SuggestedFriends";
import PostCard from "../compnents/PostCard";
import { getAllPostsApi, getFollowingPostsApi, getSavedPostsApi, getUserPostsApi } from "../services/PostServices";
import { Bookmark, EarthIcon, Newspaper, SparkleIcon } from "lucide-react";
import { PostI } from "../interfaces/PostI";
import { UserI } from "../interfaces/UserI";
import { getUserApi } from "../services/UserServices";
import PostSkeleton from "../compnents/PostSkeleton";

export default function Home() {
  const [feedType, setFeedType] = useState<"all"|"myPosts"|"following"|"saved">("all")
  const[posts,setPosts] = useState<PostI[]>([])
  const [privacy, setPrivacy] = useState("public")
  const [loading, setLoading] = useState(false)
  async function fetchPosts(type: "all" | "myPosts"|"following"|"saved") {
      setLoading(true)
  const user: UserI = await getUserApi()
  let posts: PostI[] = []
  if(type === "all") {
    posts = await getAllPostsApi()
  } else if(type === "myPosts") {
    posts = await getUserPostsApi(user._id)  
  }
  else if(type === "following") {
    posts = await getFollowingPostsApi()
  } 
  else if(type === "saved") {
    posts = await getSavedPostsApi()
  } 
  setPosts(posts)
  setLoading(false)
  }
  useEffect(()=>{
    fetchPosts("all")
  },[])
  return <>
  <div className=" myContainer body-space grid items-start  lg:grid-cols-10 grid-cols-1 lg:gap-5 gap-y-5 overflow-visible ">
    <div className="left-sec lg:order-1 order-1 bg-white p-4 rounded-xl shadow lg:sticky lg:top-27 lg:col-span-2 mt-2 h-fit ">
<ul className="lists grid lg:grid-cols-1 grid-cols-2 gap-y-2.5 font-extrabold text-gray-700 text-sm">
  <li 
    className={`flex gap-x-2 py-1 px-2 rounded-xl cursor-pointer ${feedType === "all" ? "bg-blue-100 text-blue-500" : ""}`}
    onClick={() => { setFeedType("all"); fetchPosts("all") }}
  >
    <Newspaper className='size-5'/> Feed
  </li>
  <li 
    className={`flex gap-x-2 py-1 px-2 rounded-xl cursor-pointer ${feedType === "myPosts" ? "bg-blue-100 text-blue-500" : ""}`}
    onClick={() => { setFeedType("myPosts"); fetchPosts("myPosts") }}
  >
    <SparkleIcon className='mt-0.5 size-5'/> My Posts
  </li>
  <li 
    className={`flex gap-x-2 py-1 px-2 rounded-xl cursor-pointer ${feedType === "following" ? "bg-blue-100 text-blue-500" : ""}`}
    onClick={() => { setFeedType("following"); fetchPosts("following") }}
  >
    <EarthIcon className='size-5'/> Community
  </li>
   <li 
    className={`flex gap-x-2 py-1 px-2 rounded-xl cursor-pointer ${feedType === "saved" ? "bg-blue-100 text-blue-500" : ""}`}
    onClick={() => { setFeedType("saved"); fetchPosts("saved") }}
  >
    <Bookmark className='size-5'/> Saved
  </li>
</ul>
    </div>
    <div className="mid-sec lg:orde-2 order-3   lg:col-span-5   flex flex-col gap-y-4">
      <div className="bg-white rounded-2xl p-4">
      <div className="flex gap-x-4">
        <Image  src={Logo} width={50} height={50} alt="user photo" className="size-8 rounded-full"/>
        <span className="font-extrabold mt-1">Muhammed</span>
      </div>
            <PrivacyDropdown 
      value={privacy}
      onChange={setPrivacy}
      options={[
        { label: "Public", value: "public" },
        { label: "Followers", value: "followers" },
        { label: "Only me", value: "onlyMe" },
      ]}
    />
    <div>
    <Textarea/>
    <AddPostFooter/>
    </div>
      </div>
{
  loading ? (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow text-gray-500 font-semibold">
      <p className="text-blue-500 text-3xl font-extrabold">No posts yet 🚀</p>
    </div>
  ) : (
    posts.map((post) => (
      <PostCard post={post} key={post._id} />
    ))
  )
}
    </div>
    <SuggestedFriends className='right-sec order-2 lg:order-3 lg:col-span-3  lg:sticky lg:top-27 block  h-fit'/>
  </div>
  </>
}
