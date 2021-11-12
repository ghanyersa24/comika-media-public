import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import useSWR from 'swr'
import { DateFormatterWithHour } from '../../components/date-formatter'
import { Note } from '../../components/form/note'
import SummaryItemStoreMobile from '../../components/items/summary-item-store-mobile'
import NotificationNonTransaction from '../../components/page/notification/notification-non-transaction'
import NotificationTransaction from '../../components/page/notification/notification-transaction'
import { client } from '../../lib/clientRaw'
import { API_NOTIFICATION } from '../../res/api-endpoint'
import { cartType, Notification } from '../../res/interface'

export const App = ():ReactElement => {
  const router = useRouter()
  const { id } = router.query
  const [session] = useSession()

  const { data: notification } = useSWR<Notification>(() => (session && id ? `${API_NOTIFICATION}/${id}` : null), client.get)
  if (!notification) return <div>Loading...</div>
  console.log('🚀 ~ file: [id].tsx ~ line 43 ~ App ~ notification', notification)
  if (notification.type === 'transaksi') {
    return (
      <NotificationTransaction notification={notification} />
    )
  }
  return (<NotificationNonTransaction notification={notification} />)
}

export default App
