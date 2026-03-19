import { getUserToken } from "../helpers/GetUserToken";
import { PostI } from "../interfaces/PostI";

export async function getAllPostsApi(){
    const token=await getUserToken()
    
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`,{
        headers:{
   "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    const posts:PostI[]=data.data.posts
    return posts
    
} 
export async function getUserPostsApi(userId:string){
        const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/posts`,{
    headers:{
   "Authorization": `Bearer ${token}`,
   "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    const posts:PostI[]=data.data.posts
    return posts
    
} 
export async function getFollowingPostsApi(){
    const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/feed?only=following`,{
   headers:{
   "Authorization": `Bearer ${token}`,
        }
    })
    const data:any=await res.json()
    const posts:PostI[]=data.data.posts
    return posts
} 
export async function getSavedPostsApi(){
    const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/bookmarks`,{
   headers:{
   "Authorization": `Bearer ${token}`,
        }
    })
    const data:any=await res.json()
    const posts:PostI[]=data.data.bookmarks
    return posts
} 
export async function AddPostsApi(formData:FormData){
        const token=await getUserToken()
        const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`,{
        body:formData,
        method:'POST',
   headers:{
   "Authorization": `Bearer ${token}`,
        }
    })
    const data:any=await res.json()
    return data
}
export async function sharePostApi(postId:string,text:string){
const token=await getUserToken()
const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/share`, {
method: "POST",
   headers:{
   "Authorization": `Bearer ${token}`,
   "Content-Type": "application/json"
        },

body: JSON.stringify({ body: text }),
});
const data = await res.json();
console.log();

return data;
}