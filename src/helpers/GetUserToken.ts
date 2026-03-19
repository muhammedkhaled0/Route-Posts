"use server"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getUserToken(){
    console.log("secret:", process.env.NEXTAUTH_SECRET);
     const x = (await cookies()).get("next-auth.session-token")?.value||(await cookies())
     
     .get("__Secure-next-auth.session-token")?.value
     const accessToken=await decode({
        token:x,
        secret:process.env.NEXTAUTH_SECRET!
    }) 
     console.log(x);
     
      return accessToken?.token 
    }