import PersonIcon from '@/src/compnents/icons/PersonIcon'
import KeyIcon from '@/src/compnents/icons/keyIcon'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from "zod"
type LoginInputs = {
  email: string
  password: string
}
const schema = z.object({
    email: z.string().nonempty("Email is Required").regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Invalid Email'),
      password:z.string().nonempty('Password Is Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"Password should coinatins a capital and small letters, spceial character,numbers and no less than 8 characters"),
  })
export default function Login() {
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
    
  }
  return (
    <>
      <h2 className='font-extrabold text-2xl mb-2'>Log in to Route Posts</h2>
      <p className='text-gray-500 text-sm mb-4'>Log in and continue your social journey.</p>
  <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(sendData)}>
    <div className='relative'>
        <PersonIcon className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-4" />
  <input
    className="input"
    placeholder='Enter Logged Email'
    type="email"
    {...register('email')}
  />
    </div>
      {touchedFields.email&& <p className='text-red-500'>{errors.email?.message}</p>}

<div className='relative'>
        <KeyIcon className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-4" />

    <input
    className="input"
    placeholder='Password'
    type="password"
    {...register('password')}
    />
</div>
    {touchedFields.password&& <p className='text-red-500'>{errors.password?.message}</p>}
  <button type='submit' className='w-full bg-dark-Blue py-3 text-white font-extrabold rounded-xl cursor-pointer hover:bg-[#04216a] transition-all duration-500'>Log in</button>
  </form>
    </>
  )
}
