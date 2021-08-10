/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useSWRInfinite } from 'swr'
import React, { } from 'react'
import ContainerPadding from '../components/container-padding'
import {
  MorePosts, TitlePost,
} from '../components/more-posts'
import { IntroDekstop, IntroMobile } from '../components/intro'
import { client } from '../lib/clientRaw'
import { API_ENDPOINT_LIST_ARTICLE } from '../res/api-endpoint'
import { Post } from '../res/interface'
import Layout from '../components/layout'
import SearchNavigation from '../components/blog/navigation/search-navigation-mobile'
import { RenderMoreArticle } from '../components/blog/more-articles'
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from '../res/string'

type Props= {
  lastestArticles:Post[],
  pupularArticles:Post[],
  isMobile:boolean,
  limit:number
}

export default function Index(
  {
    lastestArticles, pupularArticles, isMobile, limit,
  }:Props,
): React.ReactNode {
  // pagination
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${API_ENDPOINT_LIST_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${limit}&page=${2 + pageIndex}`
  }
  const {
    data: moreArticles, size, setSize, isValidating,
  } = useSWRInfinite(getKey, client.get)
  const handleLoadMore = () => {
    setSize(size + 1)
  }

  return (
    <Layout isMobile={isMobile}>
      <Head>
        <title>Comika Media</title>
      </Head>
      {/* <Container> */}
      {isMobile ? (
        <>
          <SearchNavigation />
          <IntroMobile />
        </>
      ) : <IntroDekstop />}

      <ContainerPadding className="mt-8 md:mt-12 mb-24">
        {lastestArticles.length > 0 && <MorePosts posts={lastestArticles} title="Artikel Terbaru" description="Terbaru di minggu ini" />}
        {pupularArticles.length > 0 && <MorePosts posts={pupularArticles} title="Artikel Terpopuler" description="Terpopuler di minggu ini" />}
        <TitlePost title="Artikel Lainya" description="Lainya di minggu ini" />
        <RenderMoreArticle data={moreArticles} />

        <div className="text-right mt-8">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isValidating}
            className="text-base px-2 md:text-lg leading-tight text-primary "
          >
            {isValidating ? 'loading' : 'Lihat artikel lainnya'}
          </button>
        </div>

      </ContainerPadding>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))
  const limit = isMobile ? LIMIT_MOBILE : LIMIT_DEKSTOP

  const lastestArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${limit}&page=${1}`)
  const pupularArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=popular&ordering=DESC&limit=${limit}&page=${1}`)

  if (!lastestArticles) {
    return {
      notFound: true,
    }
  }
  // will be passed to the page component as props
  return {
    props: {
      lastestArticles, pupularArticles, isMobile, limit,
    },
  }
}
