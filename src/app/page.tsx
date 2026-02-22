"use client"
import Image from "next/image";
import Logo from "@/src/app/icon.png"
import Dropdown from "../compnents/Dropdown";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data" 
import React, { useContext, useEffect, useRef, useState } from "react";
import PrivacyDropdown from "../compnents/PrivacyDropdown";
import SuggestedFriends from "../compnents/SuggestedFriends";
import PostCard from "../compnents/PostCard";
import { AddPostsApi, getAllPostsApi, getFollowingPostsApi, getSavedPostsApi, getUserPostsApi } from "../services/PostServices";
import { Bookmark, EarthIcon, ImagePlay, Newspaper, Send, Smile, SparkleIcon, X } from "lucide-react";
import { PostI } from "../interfaces/PostI";
import PostSkeleton from "../compnents/PostSkeleton";
import { UserContext } from "../compnents/Contexts/UserContext";
export default function Home() {
  const [posting, setPosting] = useState(false)
  const [open, setOpen] = useState(false)
  const [postBody,setPostBody] = useState<string>('');
  const [postImg,setPostImg] = useState<string | null>(null);
  const [sendedPostImg,setSendedPostImg] = useState<File | null>(null);
  function handleImage(e:React.ChangeEvent<HTMLInputElement>){
       
    const img=e.target.files?.[0]
      if (!img) return;
    setPostImg(URL.createObjectURL(img))  
    setSendedPostImg(img)
  }
  const [feedType, setFeedType] = useState<"all"|"myPosts"|"following"|"saved">("all")
  const[posts,setPosts] = useState<PostI[]>([])
  const [privacy, setPrivacy] = useState("public")
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext);
  const [imgSrc, setImgSrc] = useState(user?.photo || "/person.jpg");
  async function fetchPosts(type: "all" | "myPosts"|"following"|"saved") {
      setLoading(true)
  let posts: PostI[] = []
  if(type === "all") {
    posts = await getAllPostsApi()
  } else if(type === "myPosts") {
  if (!user) return
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
  async function sendPost(){
  setPosting(true)
  const formData = new FormData()
  if (postBody) formData.append("body", postBody)
  if (sendedPostImg) formData.append("image", sendedPostImg)
  formData.append("privacy", privacy)
  const x = await AddPostsApi(formData)
  setPosting(false)
  setSendedPostImg(null)
  setPostBody('')
  setPostImg(null)
  fetchPosts(feedType)
  }
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
  <Image
      src={imgSrc}
      onError={() => setImgSrc("/person.jpg")}
      width={50}
      height={50}
      alt="user photo"
      className="size-8 rounded-full"
    />
            <span className="font-extrabold mt-1">Muhammed</span>
      </div>
            <PrivacyDropdown 
      value={privacy}
      onChange={setPrivacy}
      options={[
        { label: "Public", value: "public" },
        { label: "following", value: "following" },
        { label: "Only me", value: "only_me" },
      ]}
    />
    <div>
      {
        user?
      <textarea onChange={(e)=>{setPostBody(e.target.value)}}  value={postBody} name="" id="" className="w-full mt-4 h-40 border border-gray-300 p-4 rounded-2xl  focus:outline focus:outline-blue-500 resize-y"   placeholder={`What's on your mind, ${user.name}?`}></textarea>
      :''
      }
      {
        postImg?
     <div className="relative">
      <div className="absolute top-3 right-3 rounded-full text-white bg-gray-800 cursor-pointer" onClick={()=>{setPostImg(null)}}>
      <X/>
      </div>
       <img src={postImg} className="w-full"/>
     </div>:''
      }
    {/* ==================================================add post footer=============================== */}

      <div className="h-px bg-gray-200 mx-0 my-2" />
      <div className="flex items-center justify-between py-1">
        {/* Actions */}
        <div className="flex gap-1">
 <input
        id="media-upload"
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={
          (e) => {handleImage(e)}
      
      }
      />
      <label
        htmlFor="media-upload"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-500 cursor-pointer"
      >
        <ImagePlay className="size-5 text-green-500" />
        <span className="text-green-600 sm:block hidden">Photo/video</span>
      </label>
 <div className="relative">
      {/* نفس الـ UI بالظبط */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-500 cursor-pointer"
      >
        <Smile className="w-5 h-5 text-yellow-400" />
        <span className="text-yellow-500 sm:block hidden">Feeling/activity</span>
      </button>

      {open && (
        <div className="absolute top-12 z-50">
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => {
            setPostBody(prev => prev + emoji.native)
              setOpen(false)
            }}
          />
        </div>
      )}
    </div>
        </div>
        {/* Post Button */}
        <button onClick={()=>{
          sendPost()
          
        }} disabled={posting || (!postImg && !postBody)} className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
       {posting ? "Posting..." : "Post"}
          <Send className="w-4 h-4" />
        </button>
      </div>
      {/* ========================================end add post footer==================================== */}
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
      <PostCard post={post} key={post._id} currentUserId={user?._id}/>
    ))
  )
}
    </div>
    <SuggestedFriends className='right-sec order-2 lg:order-3 lg:col-span-3  lg:sticky lg:top-20 block  h-fit'/>
  </div>
  </>
}
