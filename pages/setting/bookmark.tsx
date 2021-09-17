import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { TiTick } from 'react-icons/ti'
import SwipeableViews from 'react-swipeable-views'
import { GetServerSideProps } from 'next'
import { signIn, useSession } from 'next-auth/client'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { SubsribeItem } from '../../components/card/subscribe-item'
import { ListCustomPrefix } from '../../components/list/list-custom-prefix'
import { ButtonJustifyBetween } from '../../components/button/button-justify-between'
import Layout from '../../components/layout'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_BOOKMARKED_ARTICLE } from '../../res/api-endpoint'
import { MorePosts } from '../../components/more-posts'
import ContainerPadding from '../../components/container-padding'
import { IntroDekstop } from '../../components/intro'

const SubscriptionMobile = ({ content: contents }) => (
  <section className="">
    <SwipeableViews
      enableMouseEvents
      className="px-3"
      slideClassName="px-1 overflow-hidden "
    >
      {contents.map((item) => (
        <div key={Math.random()}>
          {item}
        </div>
      ))}
      {/* <div>1</div>
      <div>2</div>
      <div>3</div> */}
    </SwipeableViews>
  </section>
)
const EmptyBookmark = ({ onClick }) => (
  <div className="flex flex-col items-center self-center w-full mt-24 mb-12">
    <img
      src="/assets/info/mejakosong.svg"
      className="w-1/2 "
    />
    <span className="mt-20 text-xl font-medium text-center text-primary ">Bookmark belum tersedia</span>
    <span className="max-w-xs mt-6 text-base text-center text-primary">Baca artikel dan simpan artikel yang kamu sukai disini</span>
    <button onClick={onClick} type="button" className="mt-16 btn-primary">Tambah Artikel</button>
  </div>
)

export const BookmarkedArticle = ({ isMobile }:{isMobile:boolean}): ReactElement => {
  const [session] = useSession()
  // eslint-disable-next-line no-unused-vars
  const { data: bookmarkedArticles, mutate: mutateBookmarkedArticles } = useSWR(`${API_ENDPOINT_BOOKMARKED_ARTICLE}`, client.get)
  console.log('lastestArticles', bookmarkedArticles)

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleClickAddBookmark = () => {
    router.push('/article')
  }

  if (isMobile) {
    return (
      <Layout isMobile>
        <div className="relative bg-primary">
          <p className="pt-6 pb-4 text-xl font-bold leading-relaxed text-center text-white ">Bookmark Artikel</p>
          <img
            src="/background/Group48393.svg"
            className="absolute top-0 left-0 z-0 h-20"
          />
          <ContainerPadding className="relative min-h-screen pt-0.5 bg-bgBlueLight rounded-t-xl">
            {bookmarkedArticles?.length !== 0 ? <MorePosts posts={bookmarkedArticles} mutate={mutateBookmarkedArticles} title="Bookmark Artikel" description="Artikel yang telah anda simpan" />
              : (
                <EmptyBookmark onClick={handleClickAddBookmark} />
              )}
          </ContainerPadding>
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
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  // will be passed to the page component as props
  return {
    props: {
      isMobile,
    },
  }
}
export default BookmarkedArticle
