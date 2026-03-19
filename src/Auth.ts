
import { FailedLoginResponse, SuccessLoginResponse } from "@/src/interfaces/Login"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions:AuthOptions={
  providers:[
    CredentialsProvider({
        name: "Credentials",
        credentials:{
            email:{},
            password:{}
        },
        async authorize(credentials){
            const res=await fetch(`https://route-posts.routemisr.com/users/signin`,
                {
                method:"POST",
                body:JSON.stringify({
                    email:credentials?.email,
                    password:credentials?.password
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
        const payload:SuccessLoginResponse|FailedLoginResponse=await res.json()
        console.log(payload);
        if(payload.success==true){
             return {
                id:payload.data.user._id,
                user:payload.data.user,
                token:payload.data.token
            }
        }
        else {
             throw new Error(payload.message)
        }

        }
    })
  ],
  callbacks:{
    jwt:({user,token})=>{
        if(user){
      token.user=user.user,
      token.token=user.token
        }
      return token
    },
    session:({session,token})=>{
      session.user=token.user

      return session
    }
  },
  pages:{
    signIn:"/auth",
    error:"/auth"
  },
  secret:process.env.NEXTAUTH_SECRET
}