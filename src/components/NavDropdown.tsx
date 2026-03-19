"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Menu } from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function UserDropdown({ user }: { user: any }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="p-2 flex items-center gap-x-2 border rounded-2xl bg-[#f7faff] border-gray-300 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {user?.photo && (
          <Image
            src={user.photo || '/person.jpg'}
            width={40}
            height={40}
            alt="User Photo"
            className="rounded-full size-8"
          />
        )}
        <span className="hidden md:inline font-extrabold text-sm capitalize">{user?.name}</span>
        <Menu className="size-3" />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 px-1 w-40 bg-white  rounded-xl shadow-lg z-50">
          <ul className="flex flex-col">
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-xl">
              <a href="/profile">Profile</a>
            </li>
            <li className="px-4 py-2  cursor-pointer hover:bg-gray-100 rounded-xl">
              <a href="/settings">Settings</a>
            </li>
            <li
              className="px-4 py-2 text-red-500  cursor-pointer hover:bg-gray-100 rounded-xl"
              onClick={() => signOut({
                callbackUrl:'/auth'
              })}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}