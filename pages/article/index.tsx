/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import React, { } from 'react'
import MorePosts from '../../components/more-posts'
import { IntroDekstop } from '../../components/intro'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_LIST_ARTICLE } from '../../res/api-endpoint'
import { Post } from '../../res/interface'
import Layout from '../../components/layout'
import { SearchBar } from '../../components/blog/navigation/search-bar'
import { OrderBy } from '../../components/blog/navigation/ordering-by'
import BackgroundArticlePage from '../../components/svg/BackgroundArticlePage'

type Props= {
  lastestArticles:Post[],
  isMobile:boolean
}
export default function Index(
  {
    lastestArticles, isMobile,
  }:Props,
): React.ReactNode {
  return (
    <Layout isMobile={isMobile}>
      <Head>
        <title>Komika Media</title>
      </Head>
      {/* <Container> */}
      {isMobile ? (
        <div className="bg-primary pt-8 pb-20 text-center relative">
          <BackgroundArticlePage className="absolute -top-4" />
          <h1 className="text-xl font-bold leading-relaxed text-white">Artikel</h1>
        </div>
      ) : <IntroDekstop />}

      <div className=" -mt-16 rounded-xl bg-white min-h-screen px-4 pt-8 relative">
        <SearchBar className="bg-gray-400 bg-opacity-30 text-gray-500 mb-2" />
        <OrderBy />
        <div className="mt-4">
          {lastestArticles.length > 0 && <MorePosts posts={lastestArticles} title="Semua Artikel" description="Semua artikel yang ada di komika" />}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const lastestArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${10}&page=${1}`)
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  if (!lastestArticles) {
    return {
      notFound: true,
    }
  }
  // will be passed to the page component as props
  return {
    props: {
      lastestArticles, isMobile,
    },
  }
}
