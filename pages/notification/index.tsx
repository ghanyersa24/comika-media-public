import React, { FunctionComponent, ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/client'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import { Tab } from '@headlessui/react'
import useSWRInfinite from 'swr/infinite'
import Layout from '../../components/layout'
import { client } from '../../lib/clientRaw'
import { Notification, UnreadNotification } from '../../res/interface'
import { API_COUNT_UNREAD_NOTIFICATION, API_NOTIFICATION } from '../../res/api-endpoint'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'
import { NotificationList } from '../../components/list/notification-list'
import NotificationHint from '../../components/general/animation/notification-hint'
import { ClickToMoreBtn } from '../../components/modal/notification-popover'

const PaginatedNotifification: FunctionComponent<
{transactionsNotification:Notification[][]}
> = ({ transactionsNotification }) => (
  <>
    {transactionsNotification?.map((transaction) => (
      <NotificationList notifications={transaction} key={Math.random()} btnClassName="bg-white my-1 px-4 " />
    ))}
  </>
)

export const BookmarkedArticle = ({ isMobile, session }:
  {isMobile:boolean, session:string[]}): ReactElement => {
  const { data: unreadNotifications } = useSWR<UnreadNotification>(() => (session ? `${API_COUNT_UNREAD_NOTIFICATION}` : null), client.get, { errorRetryCount: 0 })

  const getKeyTransactionNotification = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${API_NOTIFICATION}?limit=${5}&page=${0 + pageIndex}&type=transaksi`
  }
  const getKeyInformasiNotification = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${API_NOTIFICATION}?limit=${5}&page=${0 + pageIndex}&type=informasi`
  }

  const {
    data: transactionsNotification, size: sizeTransaction,
    setSize: setSizeTransactionNotifications,
  } = useSWRInfinite<Notification[]>(getKeyTransactionNotification, client.get)

  const {
    data: messagesNotification, size: sizeMessages,
    setSize: setSizeMessagesNotifications,
  } = useSWRInfinite<Notification[]>(getKeyInformasiNotification, client.get)

  // eslint-disable-next-line no-unused-vars
  if (!session) {
    toast.info('Harap Login terlebih dahulu', {
      position: 'bottom-right',
      onClose: () => signIn(),
    })
  }

  if (isMobile) {
    return (
      <Layout isMobile title="Notifications">
        <div className="relative bg-primary">
          <TopNavbarWithBackButton
            title="Notifikasi"
          />
          <div className="mt-12">
            <Tab.Group>
              <Tab.List className="flex justify-between w-full text-lg ">
                <Tab className={({ selected }) => `flex-1 py-3 focus:ring-0 ${selected ? 'text-white font-medium ' : 'text-gray-300'}`}>

                  <div className="relative mx-auto w-min">
                    Pesan
                    {unreadNotifications?.unreadInformasi !== 0 && (
                    <NotificationHint />
                    )}
                  </div>
                </Tab>
                <Tab className={({ selected }) => `flex-1 py-3 focus:ring-0 ${selected ? 'text-white font-medium ' : 'text-gray-300'}`}>
                  <div className="relative mx-auto w-min">
                    Transaksi
                    {unreadNotifications?.unreadTransaksi !== 0 && (
                    <NotificationHint />
                    )}
                  </div>
                </Tab>
              </Tab.List>
              <Tab.Panels className="relative min-h-screen mb-16 bg-bgBlueLight rounded-t-xl">
                <Tab.Panel className="">
                  <PaginatedNotifification transactionsNotification={messagesNotification} />
                  <ClickToMoreBtn onClick={() => setSizeMessagesNotifications(sizeMessages + 1)} name="Tampilkan lebih banyak" />
                </Tab.Panel>
                <Tab.Panel className="">
                  <PaginatedNotifification transactionsNotification={transactionsNotification} />
                  <ClickToMoreBtn onClick={() => setSizeTransactionNotifications(sizeTransaction + 1)} name="Tampilkan lebih banyak" />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </Layout>
    )
  }
  return (
    <Layout isMobile={false}>
      <div className="max-w-screen-md px-4 mx-auto my-24 rounded-lg shadow-md ">
        <div className="px-6 py-4 border-b ">
          <p className="text-xl font-bold ">Notifikasi</p>
        </div>
        <Tab.Group>
          <Tab.List className="flex justify-between w-full text-lg ">
            <Tab className={({ selected }) => ` flex-1 py-3 focus:ring-0 ${selected ? 'text-primary font-medium' : 'text-gray-500'}`}>

              <div className="relative mx-auto w-min">
                Pesan
                {unreadNotifications?.unreadInformasi !== 0 && (
                <NotificationHint />
                )}
              </div>

            </Tab>
            <Tab className={({ selected }) => ` flex-1 py-3 focus:ring-0 ${selected ? 'text-primary font-medium ' : 'text-gray-500'}`}>
              <div className="relative mx-auto w-min">
                Transaksi
                {unreadNotifications?.unreadTransaksi !== 0 && (
                <NotificationHint />
                )}
              </div>

            </Tab>
            {' '}

          </Tab.List>
          <Tab.Panels className="relative min-h-screen pb-8 rounded-t-xl ">
            <Tab.Panel className="">
              <PaginatedNotifification transactionsNotification={messagesNotification} />
              <ClickToMoreBtn onClick={() => setSizeMessagesNotifications(sizeMessages + 1)} name="Tampilkan lebih banyak" />
            </Tab.Panel>
            <Tab.Panel className="">
              <PaginatedNotifification transactionsNotification={transactionsNotification} />
              <ClickToMoreBtn onClick={() => setSizeTransactionNotifications(sizeTransaction + 1)} name="Tampilkan lebih banyak" />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const UA = context.req.headers['user-agent']
  const session = await getSession(context)

  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  // will be passed to the page component as props
  return {
    props: {
      isMobile,
      session,
    },
  }
}
export default BookmarkedArticle
