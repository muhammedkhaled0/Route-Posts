"use client"
import Loading from "@/src/components/Loading";
import { getUserNotificationsApi, getUserNotificationsCountApi } from "@/src/services/UserServices.action";
import { CheckCheck } from "lucide-react";
import { useEffect,useState } from "react";
export default  function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
const [unReadNotificationsCount, setUnReadNotificationsCount] = useState<number>(0);
const [status, setStatus] = useState<'true' | 'false'>('false')
async function  getDataFromApis(){
  const notifications=await getUserNotificationsApi(status)
  setNotifications(notifications)
  const unReadNotificationsCount=await getUserNotificationsCountApi()
  setUnReadNotificationsCount(unReadNotificationsCount)
}

useEffect(()=>{
  getDataFromApis()
},[])
  return <div className="w-9/10 mx-auto body-space  rounded-xl shadow-md p-6">
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="text-2xl font-extrabold">Notifications</h2>
      <p className="text-gray-500 text-sm">Realtime updates for likes, comments, shares, and follows.</p>
    </div>
    <button className="text-gray-700 font-extrabold rounded-lg cursor-pointer flex gap-x-1 border border-gray-300 p-3 bg-white text-sm"><CheckCheck size={15} /> Mark all as read</button>
  </div>
  {/* Tabs */}
  <div className="flex space-x-2 mb-4">
    <button 
    onClick={ async()=>{
      setStatus('false')
      const notifications=await getUserNotificationsApi('false')
      setNotifications(notifications)
    }}
    disabled={status==='false'} 
    className={"px-4 py-1 rounded-full text-sm cursor-pointer "+ (status==='false'?'bg-blue-600 text-white':'bg-gray-200 text-gray-700')}>
      All
    </button>

    <button 
     disabled={status==='true'} 
    onClick={ async()=>{
      setStatus('true')
      const notifications=await getUserNotificationsApi(status)
      setNotifications(notifications)
    }} 
    className={" px-4 py-1 rounded-full text-sm cursor-pointer "+ (status==='true'?'bg-blue-600 text-white':'bg-gray-200 text-gray-700')}>Unread <span className={"px-2 rounded-full ml-1 text-xs "+ (status==='true'?'bg-blue-500 text-white':'bg-gray-300 text-gray-700')}>{unReadNotificationsCount}</span></button>
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
