import { MdNotifications } from 'react-icons/md'
import router from 'next/router'
import React, { FunctionComponent } from 'react'
import useSWR from 'swr'
import cn from 'classnames'
import { useSession } from 'next-auth/client'
import { client } from '../../lib/clientRaw'
import { API_NOTIFICATION } from '../../res/api-endpoint'

export const ButtonNotificationMobile:FunctionComponent<{isFilled?:boolean}> = (
  { isFilled = false },
) => {
  const [session] = useSession()
  const { data: messagesNotification } = useSWR<Notification[]>(() => (session ? `${API_NOTIFICATION}?limit=100&page=1&type=informasi` : null), client.get, { errorRetryCount: 0 })
  const { data: transactionsNotification } = useSWR<Notification[]>(() => (session ? `${API_NOTIFICATION}?limit=100&page=1&type=transaksi` : null), client.get, { errorRetryCount: 0 })
  const notificationsLength = (transactionsNotification?.length + messagesNotification?.length) || 0
  return (
    <button
      onClick={() => router.push('/notification')}
      type="button"
      className={cn('relative p-2 text-xl',
        { 'bg-white text-black rounded-lg shadow': isFilled },
        { 'text-white': !isFilled })}
    >
      <MdNotifications />
      { ![0, undefined].includes(notificationsLength) && (
        <div className="absolute top-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full right-1">
          {notificationsLength}
        </div>
      )}
    </button>
  )
}

export default ButtonNotificationMobile
