import Loading from "@/src/compnents/Loading";
import { getUserNotificationsApi } from "@/src/services/UserServices";
export default async function Notifications() {
  const notifications=await getUserNotificationsApi()
  return <div className="w-9/10 mx-auto body-space  rounded-xl shadow-md p-6">
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="text-xl font-semibold">Notifications</h2>
      <p className="text-gray-500 text-sm">Realtime updates for likes, comments, shares, and follows.</p>
    </div>
    <button className="text-blue-600 font-medium hover:underline cursor-pointer">Mark all as read</button>
  </div>
  {/* Tabs */}
  <div className="flex space-x-2 mb-4">
    <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">All</button>
    <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">Unread <span className="bg-gray-300 px-2 rounded-full ml-1 text-xs">16</span></button>
  </div>
  {/* Notification Item */}
  <div className="space-y-2">
    {notifications.map((noti:any)=>
            <div className="flex items-start bg-blue-100 rounded-lg p-3 space-x-3">
      <img src={noti.actor.photo} alt="avatar" className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <p className="text-gray-800"><span className="font-semibold">{noti.actor.name}</span> {noti.type}</p>
        <p className="text-gray-500 text-sm">{noti.entity.body}</p>
        <button className="mt-1 text-blue-600 text-sm flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Mark as read</span>
        </button>
      </div>
      <span className="text-gray-400 text-xs mt-1">2d</span>
    </div>
    )}
  </div>
</div>

}
