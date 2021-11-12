import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import router from 'next/router'
import { Notification } from '../../res/interface'
import { DateFormatterRelative } from '../date-formatter'

type Props = {
	notifications:Notification[]
  btnClassName?:string
}
export const NotificationList: FunctionComponent<Props> = ({ notifications, btnClassName }) => (
  <>
    {notifications?.map((notification) => (
      <button onClick={() => router.push(`/notification/${notification.id}`)} type="button" className={`w-full py-3 text-left rounded-lg  focus:ring-0 hover:bg-gray-100 ${btnClassName}`} key={notification.id}>
        <div className="flex w-full">
          <div className="flex flex-col items-stretch flex-grow ">
            <div className="flex">
              <div className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 rounded-full">
                <Image
                  src={notification.typeIcon}
                  alt="notif"
                  layout="intrinsic"
                  className="rounded-full"
                  width={64}
                  height={64}
                />
              </div>
              <div>{notification.type}</div>
            </div>

            <div className="flex flex-col justify-center flex-1 text-base ">
              <div className="font-extrabold line-clamp-1 ">
                {notification.title}
              </div>
              <div className="mt-1 text-sm text-gray-800 line-clamp-2">
                {notification.description}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div><DateFormatterRelative dateString={notification.createdAt} /></div>
            <div className="w-20 h-20 mt-1 ml-2 rounded-lg bg-gray-50">
              <Image
                src={notification.img}
                alt="notif"
                layout="intrinsic"
                className="rounded-full"
                width={144}
                height={144}
              />
            </div>
          </div>

        </div>

      </button>
    ))}
  </>
)

export default NotificationList
