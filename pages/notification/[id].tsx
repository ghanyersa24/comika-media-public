import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import useSWR from 'swr'
import mobile from 'is-mobile'
import { DateFormatterWithHour } from '../../components/date-formatter'
import { Note } from '../../components/form/note'
import SummaryItemStoreMobile from '../../components/items/summary-item-store-mobile'
import Layout from '../../components/layout'
import NotificationNonTransaction from '../../components/page/notification/notification-non-transaction'
import NotificationTransaction from '../../components/page/notification/notification-transaction'
import { client } from '../../lib/clientRaw'
import { API_NOTIFICATION } from '../../res/api-endpoint'
import { Notification } from '../../res/interface'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'
import { useMatchMutate } from '../../helper/mutateManyRegex'

const isMobile = mobile()
export const App = ():ReactElement => {
  const matchMutate = useMatchMutate()
  matchMutate(/^\/notification\/unread\?/)

  const router = useRouter()
  const { id } = router.query
  const [session] = useSession()

  const { data: notification } = useSWR<Notification>(() => (session && id ? `${API_NOTIFICATION}/${id}` : null), client.get)
  if (!notification) return <div>Loading...</div>
  if (notification.type === 'transaksi') {
    return (
      <Layout isMobile={isMobile} prevTitle="Detail Notification" title={notification.title}>
        {isMobile ? (
          <div className="relative w-full min-h-screen bg-primary md:bg-white">
            <TopNavbarWithBackButton
              title="Rincian Pembayaran"
            />
            <NotificationTransaction notification={notification} />
          </div>
        )
          : (
            <div className="relative w-full min-h-screen ">
              <NotificationTransaction notification={notification} />
            </div>
          )}
      </Layout>
    )
  }
  return (
    <Layout isMobile={isMobile} prevTitle="Detail Notification" title={notification.title}>
      {isMobile && (
      <TopNavbarWithBackButton
        title="Rincian Pembayaran"
      />
      )}
      <div className="relative w-full min-h-screen ">
        <NotificationNonTransaction notification={notification} />
      </div>
    </Layout>
  )
}

export default App
