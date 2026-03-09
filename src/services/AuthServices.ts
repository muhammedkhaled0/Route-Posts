"use server"
import { FaildRegisterRes, SuccRegisterRes } from "../interfaces/FailedRegister";
import { RegisterInputs } from "../interfaces/RegisterInputsType";

export async function registerApi(data:RegisterInputs){
    try{
       const res= await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signup`,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'content-type':'application/json'
        }
       })       
       const payload:SuccRegisterRes|FaildRegisterRes=await res.json()
       console.log(payload);
       
       return payload
    }
    catch(error ){
   if (error instanceof Error) {
      return error;
    }

    return  "Something went wrong";
  }  
    }