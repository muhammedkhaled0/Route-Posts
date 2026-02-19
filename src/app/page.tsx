import Image from "next/image";
import FeedIcon from "../compnents/icons/FeedIcon";
import BookmarkIcon from "../compnents/icons/BookmarkIcon";
import EarthIcon from "../compnents/icons/EarthIcon";
import SparkelsIcon from "../compnents/icons/SparkelsIcon";

export default function Home() {
  return <>
  <div className="myContainer body-space grid grid-cols-6">
    <div className="left-sec bg-white  p-4 rounded-xl shadow">
      <ul className= "lists grid lg:grid-cols-1 grid-cols-2 gap-y-2.5 font-extrabold text-gray-700 text-sm">
        <li className="flex gap-x-2 bg-blue-100 text-blue-500 py-1 rounded-xl px-2 "><FeedIcon className='mt-0.5'/> Feed</li>
        <li className="flex gap-x-2 py-1 px-2"><SparkelsIcon className='mt-0.5 size-5'/> My Posts</li>
        <li className="flex gap-x-2 py-1 px-2"><EarthIcon className='mt-0.5 size-5'/> Community</li>
        <li className="flex gap-x-2 py-1 px-2"><BookmarkIcon className=' size-5'/> Saved</li>
      </ul>
    </div>
  </div>
  </>
}
