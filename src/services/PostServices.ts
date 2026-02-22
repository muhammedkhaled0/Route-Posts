import { PostI } from "../interfaces/PostI";

export async function getAllPostsApi(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`,{
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    const posts:PostI[]=data.data.posts
    return posts
    
} 
export async function getUserPostsApi(userId:string){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/posts`,{
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    const posts:PostI[]=data.data.posts
    return posts
    
} 
export async function getFollowingPostsApi(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/feed?only=following`,{
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    const posts:PostI[]=data.data.posts
    return posts
} 
export async function getSavedPostsApi(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/bookmarks`,{
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    const posts:PostI[]=data.data.bookmarks
    return posts
} 