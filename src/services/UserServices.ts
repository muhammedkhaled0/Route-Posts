import { UserResI } from "../interfaces/UserI"

export async function getUserApi(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile-data`,{
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:UserResI=await res.json()

    return data.data.user
    
} 
export async function getUserSuggestionsApi(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/suggestions?limit=10`,{
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    console.log(data.data.suggestions);
    return data.data.suggestions
    
} 
