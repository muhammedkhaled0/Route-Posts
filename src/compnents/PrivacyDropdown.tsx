"use client"

import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
type Option = {
  label: string
  value: string
}

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export default function PrivacyDropdown({
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find(o => o.value === value)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative w-25 text-xs">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-1 bg-gray-100 hover:bg-gray-200 transition rounded-2xl mt-2"
      >
        <span>{selected?.label}</span>
        <ChevronDown size={16} />
      </button>

      {/* Menu */}
      {open && (
        <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-md overflow-hidden z-50">
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 hover:text-gray-800  ${
                option.value === value ? "bg-blue-600 text-white" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}