import Dropdown from "@/src/compnents/Dropdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Key, User } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
type RegisterInputs = {
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  password: string;
  rePassword: string;
};

const schema = z
  .object({
    name: z.string().nonempty("Name is Required"),

    username: z.string(),
    email: z
      .string()
      .nonempty("Email is Required")
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),

    dateOfBirth: z.string().nonempty("Date of birth is required"),

    gender: z.string().nonempty("Gender is required"),
    password: z
      .string()
      .nonempty("Password Is Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password should contain capital, small, number and special char",
      ),

    rePassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterInputs>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  async function sendData(data: RegisterInputs) {
    console.log(data);
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
        <Dropdown
  register={register}
  name="gender"
  touched={touchedFields.gender}
  error={errors.gender?.message}
/>
        <div className="relative">
          <AtSign className="size-5 text-gray-400 absolute top-1/2 -translate-1/2 start-4" />
          <input className="input" placeholder="Email" {...register("email")} />
        </div>
        {touchedFields.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}
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
        <button
          type="submit"
          className="w-full bg-dark-Blue py-3 text-white font-extrabold rounded-xl cursor-pointer hover:bg-[#04216a] transition-all duration-500"
        >
          Register
        </button>
      </form>
    </>
  );
}
