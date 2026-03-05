"use client"
import { UserContext } from "@/src/compnents/Contexts/UserContext";
import HeaderProfile from "@/src/compnents/HeaderProfile";
import {
  Camera,
  Expand,
  Users,
  Mail
} from "lucide-react";
import { useContext } from "react";
export  default function Profile() {
  return <div  className="myContainer body-space">
    <HeaderProfile/>
  </div>
}
