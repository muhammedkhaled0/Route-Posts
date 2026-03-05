import { LikeResI } from "../interfaces/LikeI"

export async function createAndDeleteLike(postId:string){
    
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/like`,{
        method:'PUT',
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcyNzEzNjA0LCJleHAiOjE3NzMzMTg0MDQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.esSYp_YZKOJiVrXxTIy5qbeBbHJ_jaJu0-Vga29thOE`,
        "Content-Type": "application/json"
        }
    })
    const data:LikeResI=await res.json()
    return data
    
} 