"use client"
import { getUserNotificationsApi, getUserNotificationsCountApi } from "@/src/services/UserServices.action";
import { CheckCheck } from "lucide-react";
import { useEffect,useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unReadNotificationsCount, setUnReadNotificationsCount] = useState<number>(0);
  const [status, setStatus] = useState<'true' | 'false'>('false')

  async function getDataFromApis(){
    const notifications = await getUserNotificationsApi(status)
    setNotifications(notifications)
    const unReadNotificationsCount = await getUserNotificationsCountApi()
    setUnReadNotificationsCount(unReadNotificationsCount)
  }

  useEffect(()=>{
    getDataFromApis()
  },[])

  return (
    <div className="w-9/10 mx-auto body-space overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-200/70">
      <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-sky-50 px-6 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Notifications</h2>
            <p className="mt-1 text-sm text-gray-500">
              Realtime updates for likes, comments, shares, and follows.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-x-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
            <CheckCheck size={17} />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="inline-flex rounded-full bg-gray-100 p-1">
            <button
              onClick={async () => {
                setStatus('false')
                const notifications = await getUserNotificationsApi('false')
                setNotifications(notifications)
              }}
              disabled={status === 'false'}
              className={
                "rounded-full px-5 py-2 text-sm font-bold transition " +
                (status === 'false'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900')
              }
            >
              All
            </button>

            <button
              disabled={status === 'true'}
              onClick={async () => {
                setStatus('true')
                const notifications = await getUserNotificationsApi('true')
                setNotifications(notifications)
              }}
              className={
                "rounded-full px-5 py-2 text-sm font-bold transition " +
                (status === 'true'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900')
              }
            >
              Unread
              <span
                className={
                  "ml-2 rounded-full px-2 py-0.5 text-xs " +
                  (status === 'true'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700')
                }
              >
                {unReadNotificationsCount}
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((noti: any) => (
            <div className="group flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 transition hover:border-blue-200 hover:bg-blue-50 hover:shadow-md hover:shadow-blue-100">
              <img
                src={noti.actor.photo}
                alt="avatar"
                className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm leading-6 text-gray-800">
                  <span className="font-extrabold text-gray-950">{noti.actor.name}</span>{" "}
                  <span className="font-medium">{noti.type}</span>
                </p>

                <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-500">
                  {noti.entity.body}
                </p>

                <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm transition hover:bg-blue-600 hover:text-white">
                  <CheckCheck size={14} />
                  Mark as read
                </button>
              </div>

              <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-400">
                2d
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}