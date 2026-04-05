"use server"
import { getUserToken } from "../helpers/GetUserToken"
import { FollowResI } from "../interfaces/FollowI"
import { UserResI } from "../interfaces/UserI"
import { UserResFailI, UserResSuccI } from "../interfaces/UserProfileI"

export async function getMyProfileApi(){
    const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile-data`,{
        headers:{
   "Authorization": `Bearer ${token}`,
   "Content-Type": "application/json"
}
    })
    const data:UserResI=await res.json()
        if (!res.ok || data.success === false) {
        if (data.message === "jwt expired") throw new Error("SESSION_EXPIRED")
        throw new Error(data.message || "Some error occurred while fetching user profile data.")
    }
    return data.data.user
    
} 
export async function getUserProfileApi(userId:string){
        const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/profile`,{
        headers:{
   "Authorization": `Bearer ${token}`,        "Content-Type": "application/json"
        }
    })
    const data:UserResSuccI|UserResFailI=await res.json()

    return data
    
} 
export async function getUserSuggestionsApi(){
        const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/suggestions?limit=10`,{
        headers:{
   "Authorization": `Bearer ${token}`,        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json();
    
    return data.data.suggestions
    
} 
export async function getUserNotificationsApi(status:string){
        const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications?unread=${status}&page=1&limit=10`,{
        headers:{
   "Authorization": `Bearer ${token}`,        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json();
    
    return data.data.notifications
    
} 
export async function getUserNotificationsCountApi(){
        const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/unread-count`,{
        headers:{
   "Authorization": `Bearer ${token}`,
        }
    })
    const data:any=await res.json();
    return data.data.unreadCount as number
    
} 
export async function createAndDeleteFollow(userId:string){
        const token=await getUserToken()
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/follow`,{
        method:'PUT',
        headers:{
   "Authorization": `Bearer ${token}`,        "Content-Type": "application/json"
        }
    })
    const data:FollowResI=await res.json()
    return data
} 
export async function uploadProfileCover(formData:FormData){
        const token=await getUserToken()
 const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/upload-cover`,{
        method:'PUT',
        body:formData,
        headers:{
   "Authorization": `Bearer ${token}`
        }
    })
    const data=await res.json()

    return data 
} 
export async function uploadProfilePhoto(formData:FormData){
        const token=await getUserToken()
 const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/upload-photo`,{
        method:'PUT',
        body:formData,
        headers:{
   "Authorization": `Bearer ${token}`
        }
    })
    const data=await res.json()

    return data 
} 
