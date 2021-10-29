/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useSWRInfinite } from 'swr'
import { IntroDekstop } from '../../../components/intro'
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from '../../../res/string'
import { API_ENDPOINT_ARTICLE } from '../../../res/api-endpoint'
import { client } from '../../../lib/clientRaw'

import Layout from '../../../components/layout'
import { SearchBar } from '../../../components/blog/navigation/search-bar'
import ContainerPadding from '../../../components/container-padding'
import { RenderMoreArticle } from '../../../components/blog/more-articles'

import { MorePosts } from '../../../components/more-posts'
import BackgroundArticlePage from '../../../components/svg/BackgroundArticlePage'

import { LoadMoreButton } from '../../../components/blog/button/load-more'

type Props= {
  isMobile:boolean
  limit:number

}
export default function Index(
  {
    isMobile, limit,
  }:Props,
): React.ReactNode {
  const router = useRouter()
  const { slug } = router.query

  // pagination
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${API_ENDPOINT_ARTICLE}?search=${slug}&limit=${limit}&page=${1 + pageIndex}`
  }
  const {
    data: articles, size, setSize, isValidating, mutate,
  } = useSWRInfinite(getKey, client.get)
  const handleLoadMore = () => {
    setSize(size + 1)
  }

  const myRef = useRef(null)
  const executeScroll = () => myRef.current.scrollIntoView()
  useEffect(() => {
    if (!isMobile)executeScroll()
  }, [articles])

  return (
    <Layout isMobile={isMobile}>
      <Head>
        <title>Comika Media</title>
      </Head>
      {/* <Container> */}
      {isMobile ? (
        <div className="pt-4 pb-20 text-center bg-primary ">
          <BackgroundArticlePage className="absolute -top-4" />
          <h1 className="text-xl font-bold leading-relaxed text-white">Artikel</h1>
        </div>
      ) : <IntroDekstop />}

      <ContainerPadding className="relative pt-8 mb-24 -mt-16 bg-white rounded-xl lg:mt-8">
        {isMobile && <SearchBar className="mb-2 text-gray-500 bg-gray-400 bg-opacity-30" />}
        <div className="mt-4" ref={myRef}>
          <MorePosts
            title="Hasil Pencarian"
            description={`Kata kunci  "${slug}"`}
            posts={articles?.[0]}
            mutate={mutate}
          />
          <RenderMoreArticle data={articles?.slice(1)} mutate={mutate} />
          <LoadMoreButton onClickMore={handleLoadMore} isLoading={isValidating} />

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

  // will be passed to the page component as props
  return {
    props: {
      isMobile, limit,
    },
  }
}
