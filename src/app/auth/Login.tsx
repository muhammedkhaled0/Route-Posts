"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { Key, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
type LoginInputs = {
  email: string
  password: string
}
const schema = z.object({
    email: z.string().nonempty("Email is Required").regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Invalid Email'),
      password:z.string().nonempty('Password Is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Password should coinatins a capital and small letters, spceial character,numbers and no less than 8 characters"),
  })
export default function Login() {
  const [loading, setLoading] = useState(false)
  const searchParams=useSearchParams()
     const {
    register,
    handleSubmit,
    formState: { errors ,touchedFields},
  } = useForm<LoginInputs>({
    defaultValues:{
        email:'',
        password:'',
    },
      resolver: zodResolver(schema),
      mode:'onBlur',
      reValidateMode:'onBlur',
  })
  async function  sendData(data:LoginInputs) {
    setLoading(true)
    const res =await signIn('credentials',{
      email:data.email,
      password:data.password,
      callbackUrl:'/',
      redirect:true
    })
      setLoading(false)
  }
  return (
    <>
      <h2 className='font-extrabold text-2xl mb-2'>Log in to Route Posts</h2>
      <p className='text-gray-500 text-sm mb-4'>Log in and continue your social journey.</p>
  <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(sendData)}>
    <div className='relative'>
        <User className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-4" />
  <input
    className="input"
    placeholder='Enter Logged Email'
    type="email"
    {...register('email')}
  />
    </div>
      {touchedFields.email&& <p className='text-red-500'>{errors.email?.message}</p>}

<div className='relative'>
        <Key className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-4" />

    <input
    className="input"
    placeholder='Password'
    type="password"
    {...register('password')}
    />
</div>
    {touchedFields.password&& <p className='text-red-500'>{errors.password?.message}</p>}
  <button disabled={loading}
   className={`w-full bg-dark-Blue py-3 text-white font-extrabold rounded-xl cursor-pointer hover:bg-[#04216a] transition-all duration-500 flex justify-center items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
 type='submit'>{loading ? 'Logging in...' : 'Log in'}</button>
  {searchParams.get('error') && <p className='text-red-500 text-xl text-center'>{searchParams.get('error')}</p>}
  </form>
    </>
  )
}
