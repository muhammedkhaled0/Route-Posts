"use client"
import { UserContext } from "@/src/compnents/Contexts/UserContext";
import HeaderProfile from "@/src/compnents/HeaderProfile";
import Loading from "@/src/compnents/Loading";
import PostCard from "@/src/compnents/PostCard";
import PostSkeleton from "@/src/compnents/PostSkeleton";
import { PostI } from "@/src/interfaces/PostI";
import { getUserPostsApi } from "@/src/services/PostServices";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
export  default function Profile() {
  const {user}=useContext(UserContext) 
  const [posts,setPosts]=useState<null|PostI[]>(null)
useEffect(() => {
  if (!user?._id) return;

  const fetchPosts = async () => {
    const data = await getUserPostsApi(user._id);
    setPosts(data);
  };

  fetchPosts();
}, [user]);
  if (!user) {
  return <Loading />
}
  return <div  className="mx-auto lg:w-3/4 sm:w-[90%] w-[95%]  body-space">
    <HeaderProfile />
   <div className="mt-7 flex flex-col gap-y-7">
       {
      posts?
      posts?.map((post)=>
    <PostCard currentUser={user} post={post} currentUserId={user?._id} key={post?._id}/>
      )
      :<PostSkeleton/>
    }
   </div>
  </div>
}
