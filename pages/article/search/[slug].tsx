/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { } from 'react'
import { IntroDekstop } from '../../../components/intro'
import { client } from '../../../lib/clientRaw'
import { API_ENDPOINT_LIST_ARTICLE } from '../../../res/api-endpoint'
import { Post } from '../../../res/interface'
import Layout from '../../../components/layout'
import { SearchBar } from '../../../components/blog/navigation/search-bar'

import MorePosts from '../../../components/more-posts'
import BackgroundArticlePage from '../../../components/svg/BackgroundArticlePage'

type Props= {
  searchArticles:Post[],
  isMobile:boolean
}
export default function Index(
  {
    searchArticles, isMobile,
  }:Props,
): React.ReactNode {
  const router = useRouter()
  const { slug } = router.query
  return (
    <Layout isMobile={isMobile}>
      <Head>
        <title>Komika Media</title>
      </Head>
      {/* <Container> */}
      {isMobile ? (
        <div className="bg-primary pt-4 pb-20 text-center ">
          <BackgroundArticlePage className="absolute -top-4" />
          <h1 className="text-xl font-bold leading-relaxed text-white">Artikel</h1>
        </div>
      ) : <IntroDekstop />}

      <div className=" -mt-16 rounded-xl bg-white min-h-screen px-4 pt-8 ">
        <SearchBar className="bg-gray-400 bg-opacity-30 text-gray-500" searchValue={slug as string} />
        <div className="mt-8">
          {searchArticles.length > 0 && <MorePosts posts={searchArticles} title="Hasil Pencarian" description={`Kata kunci  "${slug}"`} />}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?search=${context.params.slug}`)

  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  if (!searchArticles) {
    return {
      notFound: true,
    }
  }
  // will be passed to the page component as props
  return {
    props: {
      searchArticles, isMobile,
    },
  }
}
