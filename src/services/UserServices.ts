import { FollowResI } from "../interfaces/FollowI"
import { UserResI } from "../interfaces/UserI"
import { UserResFailI, UserResSuccI } from "../interfaces/UserProfileI"

export async function getMyProfileApi(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile-data`,{
        headers:{
   "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzczNTg5MjEyLCJleHAiOjE3NzQxOTQwMTIsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.YHXQHxWwFYFB_O7Z65o2bVIjgTazPJ8k_p6TeQN82XE`,        "Content-Type": "application/json"
        }
    })
    const data:UserResI=await res.json()

    return data.data.user
    
} 
export async function getUserProfileApi(userId:string){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/profile`,{
        headers:{
   "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzczNTg5MjEyLCJleHAiOjE3NzQxOTQwMTIsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.YHXQHxWwFYFB_O7Z65o2bVIjgTazPJ8k_p6TeQN82XE`,        "Content-Type": "application/json"
        }
    })
    const data:UserResSuccI|UserResFailI=await res.json()

    return data
    
} 
export async function getUserSuggestionsApi(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/suggestions?limit=10`,{
        headers:{
   "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzczNTg5MjEyLCJleHAiOjE3NzQxOTQwMTIsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.YHXQHxWwFYFB_O7Z65o2bVIjgTazPJ8k_p6TeQN82XE`,        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json();
    
    return data.data.suggestions
    
} 
export async function getUserNotificationsApi(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications?unread=false&page=1&limit=10`,{
        headers:{
   "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzczNTg5MjEyLCJleHAiOjE3NzQxOTQwMTIsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.YHXQHxWwFYFB_O7Z65o2bVIjgTazPJ8k_p6TeQN82XE`,        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json();
    console.log(data);
    
    return data.data.notifications
    
} 
export async function createAndDeleteFollow(userId:string){
    
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/follow`,{
        method:'PUT',
        headers:{
   "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzczNTg5MjEyLCJleHAiOjE3NzQxOTQwMTIsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.YHXQHxWwFYFB_O7Z65o2bVIjgTazPJ8k_p6TeQN82XE`,        "Content-Type": "application/json"
        }
    })
    const data:FollowResI=await res.json()
    return data
} 
export async function uploadProfileCover(formData:FormData){
    
 const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/upload-cover`,{
        method:'PUT',
        body:formData,
        headers:{
   "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzczNTg5MjEyLCJleHAiOjE3NzQxOTQwMTIsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.YHXQHxWwFYFB_O7Z65o2bVIjgTazPJ8k_p6TeQN82XE`
        }
    })
    const data=await res.json()

    return data 
} 
export async function uploadProfilePhoto(formData:FormData){
    
 const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/upload-photo`,{
        method:'PUT',
        body:formData,
        headers:{
   "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzczNTg5MjEyLCJleHAiOjE3NzQxOTQwMTIsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.YHXQHxWwFYFB_O7Z65o2bVIjgTazPJ8k_p6TeQN82XE`
        }
    })
    const data=await res.json()

    return data 
} 
