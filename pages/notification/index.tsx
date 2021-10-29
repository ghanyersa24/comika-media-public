import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/client'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import { Tab } from '@headlessui/react'
import Layout from '../../components/layout'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_BOOKMARKED_ARTICLE, API_NOTIFICATION } from '../../res/api-endpoint'
import { MorePosts } from '../../components/more-posts'
import ContainerPadding from '../../components/container-padding'
import { IntroDekstop } from '../../components/intro'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'
import { NotificationList } from '../../components/list/notification-list'

const EmptyBookmark = ({ onClick }) => (
  <div className="flex flex-col items-center self-center w-full mt-24 mb-12">
    <img
      src="/assets/info/mejakosong.svg"
      className="w-1/2 "
    />
    <div className="mt-20 text-xl font-medium text-center text-primary ">Bookmark belum tersedia</div>
    <div className="max-w-xs mt-6 text-base text-center text-primary">Baca artikel dan simpan artikel yang kamu sukai disini</div>
    <button onClick={onClick} type="button" className="mt-16 btn-primary">Tambah Artikel</button>
  </div>
)

export const BookmarkedArticle = ({ isMobile, session }:
  {isMobile:boolean, session:string[]}): ReactElement => {
  // eslint-disable-next-line no-unused-vars
  const { data: bookmarkedArticles, mutate: mutateBookmarkedArticles } = useSWR(`${API_ENDPOINT_BOOKMARKED_ARTICLE}`, client.get)
  if (!session) {
    toast.info('Harap Login terlebih dahulu', {
      position: 'bottom-right',
      onClose: () => signIn(),
    })
  }
  const { data: notifications } = useSWR<Notification[]>(() => (session ? `${API_NOTIFICATION}` : null), client.get)
  const router = useRouter()
  const handleClickAddBookmark = () => {
    router.push('/article')
  }
  if (isMobile) {
    return (
      <Layout isMobile>
        <div className="relative bg-primary">
          <TopNavbarWithBackButton
            title="Pilih Alamat utama"
          />
          <div className="mt-12">
            <Tab.Group>
              <Tab.List className="flex justify-between w-full text-lg ">
                <Tab className={({ selected }) => `flex-1 py-3 focus:ring-0 ${selected ? 'text-white underline' : 'text-gray-300'}`}>Pesan</Tab>
                <Tab className={({ selected }) => `flex-1 py-3 focus:ring-0 ${selected ? 'text-white underline' : 'text-gray-300'}`}>Transaksi</Tab>
              </Tab.List>
              <Tab.Panels className="relative min-h-screen bg-bgBlueLight rounded-t-xl ">
                <Tab.Panel className="">
                  <p className="py-4 mx-4 text-lg font-bold leading-tight">November 2021</p>
                  <NotificationList notifications={notifications} btnClassName="bg-white my-1 px-4 " />
                </Tab.Panel>
                <Tab.Panel className="">Content 2</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </Layout>
    )
  }
  return (
    <Layout isMobile={false}>
      <IntroDekstop />
      <ContainerPadding className="relative min-h-screen pt-0.5 ">
        {bookmarkedArticles?.length !== 0 ? <MorePosts posts={bookmarkedArticles} mutate={mutateBookmarkedArticles} title="Bookmark Artikel" description="Artikel yang telah anda simpan" />
          : (
            <EmptyBookmark onClick={handleClickAddBookmark} />
          )}
      </ContainerPadding>
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
