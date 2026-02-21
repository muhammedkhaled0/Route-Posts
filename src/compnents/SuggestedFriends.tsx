"use client";
import { UserRoundPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { UserI } from "../interfaces/UserI";
import { getUserSuggestionsApi } from "../services/UserServices";

export default function SuggestedFriends(props:any) {
  const [suggestions,setSuggestions]=useState<UserI[]>([]) 
  const [isOpen, setIsOpen] = useState(false);
  async function  getSuggestions(){
    const res=await getUserSuggestionsApi()
    setSuggestions(res)
  }
  useEffect(()=>{
    getSuggestions()
  },[])
  return (
    <div {...props}>
      

      {
        suggestions?
      <div className="lg:hidden mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-xl font-semibold text-sm hover:bg-blue-600 transition"
        >
          {isOpen ? "Hide Suggested Friends" : "Show Suggested Friends"}
        </button>
      </div>:''
      }

      {/* Card — always visible on lg, toggle on mobile */}
      <div
        className={`
          bg-white rounded-2xl shadow p-4
          ${isOpen ? "block" : "hidden"}
          lg:block
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-bold text-gray-800">
            <Users className="size-5 text-blue-500" />
            <span>Suggested Friends</span>
          </div>
          <span className="text-blue-500 font-semibold">{suggestions.length}</span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 mb-3">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search friends..."
            className="bg-transparent outline-none text-sm w-full text-gray-600"
          />
        </div>

        {/* List */}
        <div className="flex flex-col gap-2">
          {suggestions.map((suggestion,i) => (
            <div
              key={suggestion._id}
              className="flex flex-col bg-gray-50 rounded-xl p-3 gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src={suggestion.photo}
                      alt={suggestion.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{suggestion.name}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-blue-500 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-xs font-semibold px-3 py-1.5 rounded-xl transition">
                  <UserRoundPlus className="size-4" /> Follow
                </button>
              </div>
              <span className="text-xs text-gray-400 bg-gray-200 w-fit px-2 py-0.5 rounded-full">
                {suggestion.followersCount} followers
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}