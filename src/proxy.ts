import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
const protectedPages=['/','/profile','/notifications','']
const authPage='/auth'
export default async function proxy(req:NextRequest){
   const token=await getToken({req})
   if(protectedPages.includes(req.nextUrl.pathname)){
    if(token){
        return NextResponse.next()
    }
    else{
        const redirect = new URL('/auth',process.env.NEXTAUTH_URL)
        return NextResponse.redirect(redirect)
    }
   }
      if(req.nextUrl.pathname =='/auth'){
    if(!token){
        return NextResponse.next()
    }
    else{
        const redirect = new URL('/',process.env.NEXTAUTH_URL)
        return NextResponse.redirect(redirect)
    }
   }
}