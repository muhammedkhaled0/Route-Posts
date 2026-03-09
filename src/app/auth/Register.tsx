"use clinet"
import Dropdown from "@/src/components/Dropdown";
import { schema } from "@/src/helpers/RegisterSchema";
import { RegisterInputs } from "@/src/interfaces/RegisterInputsType";
import { registerApi } from "@/src/services/AuthServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Calendar, Key, Loader, LoaderCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
export default function Register() {
  const navigator=useRouter()
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterInputs>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth:"",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function sendData(data: RegisterInputs) {
    setLoading(true)
    setApiError(null)
    const  res=await registerApi(data)
    if(typeof res=="object"&&"success" in res  && res.success==true ){
      navigator.push('/')
      setApiError(null)
    }
    else if(typeof res=="object"&&"success" in res &&res.success==false){
      setApiError(res.message)
    }
    else if(res instanceof Error){
          setApiError(res.message);
    }
    else{
        setApiError(res);
    }
    setLoading(false)
  }
  return (
    <>
      <h2 className="font-extrabold text-2xl mb-2">Log in to Route Posts</h2>
      <p className="text-gray-500 text-sm mb-4">
        Log in and continue your social journey.
      </p>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(sendData)}>
        <div className="relative">
          <User className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-4" />
          <input
            className="input"
            placeholder="Full Name"
            {...register("name")}
          />
        </div>
        {touchedFields.name && (
          <p className="text-red-500">{errors.name?.message}</p>
        )}
        <div className="relative">
          <AtSign className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-4" />
          <input
            className="input"
            placeholder="User Name {optional}"
            {...register("username")}
          />
        </div>
        {touchedFields.username && (
          <p className="text-red-500">{errors.username?.message}</p>
        )}

        <div className="relative">
          <AtSign className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-4" />
          <input className="input" placeholder="Email" {...register("email")} />
        </div>
        {touchedFields.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}

        <div className="relative">
          <Calendar className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-4" />
          <input className="input" placeholder="Date Of Birth"  type="date"{...register("dateOfBirth")} />
        </div>
        {touchedFields.dateOfBirth && (
          <p className="text-red-500">{errors.dateOfBirth?.message}</p>
        )}
        <Dropdown
  register={register}
  name="gender"
  touched={touchedFields.gender}
  error={errors.gender?.message}
/>

        <div className="relative">
          <Key className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-5" />

          <input
            className="input"
            placeholder="Password"
            type="password"
            {...register("password")}
          />
        </div>
        {touchedFields.password && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}

        <div className="relative">
          <Key className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-5" />

          <input
            className="input"
            placeholder="Repassword"
            type="password"
            {...register("rePassword")}
          />
        </div>
        {touchedFields.rePassword && (
          <p className="text-red-500">{errors.rePassword?.message}</p>
        )}
         {apiError&&<p className="text-red-500 text-center text-xl font-bold -mt-5">{apiError}</p>}
<button
  type="submit"
  disabled={loading}
  className={`w-full bg-dark-Blue py-3 text-white font-extrabold rounded-xl cursor-pointer hover:bg-[#04216a] transition-all duration-500 ${
    loading ? "opacity-50 cursor-not-allowed" : ""
  }`}>
          {loading?<div className="flex justify-center w-full gap-x-4">Register <LoaderCircle className="animate-spin"/> </div>:"Register"}
        </button>
      </form>
    </>
  );
}
