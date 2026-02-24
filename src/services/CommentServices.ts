export async function getAllPostCommentsApi(postId:string){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments?page=1&limit=20`,{
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    return data
} 
export async function createCommentsApi(postId:string, formData:FormData){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`,{
        method:'POST',
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        },
        body:formData
    })
    const data:any=await res.json()
    return data
}
export async function updateCommentsApi(postId:string,commentId:string, formData:FormData){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}`,{
        method:'PUT',
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        },
        body:formData
    })
    const data:any=await res.json()
    return data
}
export async function createReplyApi(postId:string,commentId:string, formData:FormData){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}/replies`,{
        method:'POST',
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        },
        body:formData
    })
    const data:any=await res.json()
    return data
}
export async function getAllCommentsRepliesApi(postId:string,commentId:string){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,{
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    return data
} 
export async function putCommentLike(postId:string,commentId:string){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}/like`,{
        method:'PUT',
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    return data
} 
export async function deleteCommentApi(postId:string,commentId:string){
    const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments/${commentId}`,{
        method:'DELETE',
        headers:{
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhmZWI1YmIxMzExZmQ3YjAzMTQ4YzE5IiwiaWF0IjoxNzcxNDk5MTY0LCJleHAiOjE3NzIxMDM5NjQsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.os3DNolT4LYj0pRmRRAfNUKSf2bPKB8MX3eyX43Huyk`,
        "Content-Type": "application/json"
        }
    })
    const data:any=await res.json()
    return data
} 
