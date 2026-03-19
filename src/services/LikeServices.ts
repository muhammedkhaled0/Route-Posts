import { getUserToken } from "../helpers/GetUserToken"
import { LikeResI } from "../interfaces/LikeI"

export async function createAndDeleteLike(postId:string){
    const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/like`,{
        method:'PUT',
        headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
        }
    })
    const data:LikeResI=await res.json()
    return data
    
} 