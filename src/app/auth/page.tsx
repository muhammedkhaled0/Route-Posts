'use client'

import { useState } from "react"
import Login from "./Login"
import Register from "./Register"

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true)
  const [isRegister, setIsRegister] = useState(false)
  return <div className="lg:pt-25 md:pt-15 pt-10 myContainer min-h-dvh">
   <div className=" grid grid-cols-1 lg:grid-cols-3 gap-y-8 ">
    <div className="lg:col-span-2 lg:w-full sm:w-3/4 sm:mx-auto">
      <div className='lg:w-65/100 lg:mx-auto'>
      <div className="hidden lg:block">
      <h1 className='text-dark-Blue lg:text-6xl font-extrabold text-3xl'>Route Posts</h1>
      <p className='text-2xl mb-7'>Connect with friends and the world around you on Route Posts.</p>
      </div>
<div className="p-4 rounded-2xl border border-[#C9D5FF] bg-white">
  <h2 className="text-sm font-bold text-dark-Blue uppercase mb-2">About Route Academy</h2>
  <h3 className="text-lg font-semibold mb-3">Egypt's Leading IT Training Center Since 2012</h3>
  <p className="text-gray-700 mb-4">
    Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering high-quality training courses in programming, web development, and application development. We've identified the unique challenges people may face when learning new technology and made efforts to provide strategies to overcome them.
  </p>
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
    <div className="p-2 border border-indigo-200 bg-blue-50 rounded-2xl">
      <div className=" text-dark-Blue font-extrabold">2012</div>
      <div className="text-[#45556c] font-bold text-sm">Founded</div>
    </div>
    <div className="p-2 border border-indigo-200 bg-blue-50 rounded-2xl">
      <div className=" text-dark-Blue font-extrabold">40K+</div>
      <div className="text-[#45556c] font-bold">Graduates</div>
    </div>
    <div className="p-2 border border-indigo-200 bg-blue-50 rounded-2xl">
      <div className=" text-dark-Blue font-extrabold">50+</div>
      <div className="text-[#45556c] font-bold text-sm">Partner Companies</div>
    </div>
    <div className="p-2 border border-indigo-200 bg-blue-50 rounded-2xl">
      <div className=" text-dark-Blue font-extrabold">5</div>
      <div className="text-[#45556c] font-bold text-sm">Branches</div>
    </div>
    <div className="p-2 border border-indigo-200 bg-blue-50 rounded-2xl">
      <div className=" text-dark-Blue font-extrabold">20</div>
      <div className="text-[#45556c] font-bold text-sm">Diplomas Available</div>
    </div>
  </div>
</div>

    </div>
    </div>
    <div className='order-first lg:order-last bg-white p-7 my-auto min-h-[380px]  w-[430px] max-w-full mx-auto rounded-2xl'>
                <div className="block lg:hidden text-center">
      <h1 className='text-dark-Blue lg:text-6xl font-extrabold text-3xl'>Route Posts</h1>
      <p className=' mb-7'>Connect with friends and the world around you on Route Posts.</p>
      </div>
    <div className='buttons bg-gray-100 p-1 rounded-xl cursor-pointer mb-5'>
      <div className="loginBtn grid grid-cols-2">
        <span className={'font-extrabold  text-center text-gray-700 rounded-xl py-2 '+(isLogin?'auth-active':'')} onClick={()=>{
          setIsLogin(true)
          setIsRegister(false)

        }}>Login</span>
        <span className={'font-extrabold text-center text-gray-700 rounded-xl py-2 '+ (isRegister?'auth-active':'' )} onClick={()=>{
          setIsLogin(false)
          setIsRegister(true)
        }}>Register</span>
      </div>
    </div>

    {isLogin?<Login/>:''}
    {isRegister?<Register/>:''}
    </div>
   </div>
  </div>
}
