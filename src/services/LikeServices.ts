import { LikeResI } from "../interfaces/LikeI"

export async function createAndDeleteLike(postId:string){
    
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/like`,{
        method:'PUT',
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzczNTg5MjEyLCJleHAiOjE3NzQxOTQwMTIsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.YHXQHxWwFYFB_O7Z65o2bVIjgTazPJ8k_p6TeQN82XE`,
        "Content-Type": "application/json"
        }
    })
    const data:LikeResI=await res.json()
    return data
    
} 