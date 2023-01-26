import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/client'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import Layout from '../../components/layout'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_BOOKMARKED_ARTICLE } from '../../res/api-endpoint'
import { MorePosts } from '../../components/more-posts'
import ContainerPadding from '../../components/container-padding'
import { IntroDekstop } from '../../components/intro'

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

export const BookmarkedArticle = ({ isMobile, session }:
  {isMobile:boolean, session:string[]}): ReactElement => {
  // eslint-disable-next-line no-unused-vars
  const { data: bookmarkedArticles, mutate: mutateBookmarkedArticles } = useSWR(`${API_ENDPOINT_BOOKMARKED_ARTICLE}`, client.get)
  if (!session) {
    toast.info('Harap Login terlebih dahulu', {
      
      onClose: () => signIn(),
    })
  }
  const router = useRouter()
  const handleClickAddBookmark = () => {
    router.push('/article')
  }
  if (isMobile) {
    return (
      <Layout isMobile title="Bookmark">
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
    <Layout isMobile={false} title="Bookmark">
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
