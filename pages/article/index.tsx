/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import useSWRInfinite from 'swr/infinite'

import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { title } from 'process'
import mobile from 'is-mobile'
import dynamic from 'next/dynamic'
import { MorePosts } from '../../components/more-posts'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_ARTICLE } from '../../res/api-endpoint'
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from '../../res/string'
import Layout from '../../components/layout'
import { OrderBy } from '../../components/blog/navigation/ordering-by'
import ContainerPadding from '../../components/container-padding'
import { RenderMoreArticle } from '../../components/blog/more-articles'
import { LoadMoreButton } from '../../components/blog/button/load-more'
import { SearchBar } from '../../components/blog/navigation/search-bar'

const isMobile = mobile()

const BackgroundArticleMobile = dynamic(() => import('../../components/background/background-article-mobile') as any, { ssr: false })
const IntroDekstop = dynamic(() => import('../../components/intro/intro-dekstop') as any, { ssr: false })

const titleDescription = {
  popular: {
    title: 'Terpopular', description: 'Artikel terpopuler saat ini',
  },
  createdAt: {
    title: 'Semua Artikel', description: 'Semua artikel yang ada di comika media',
  },
}

const Index = () :ReactElement => {
  const limit = isMobile ? LIMIT_MOBILE : LIMIT_DEKSTOP
  const router = useRouter()
  const { orderBy } = router.query
  const selectedOrderBy = titleDescription?.[orderBy as string] ? orderBy as string : 'createdAt'
  const selectedTitleDescription = titleDescription[selectedOrderBy]

  // pagination
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${API_ENDPOINT_ARTICLE}?orderBy=${orderBy}&ordering=DESC&limit=${limit}&page=${1 + pageIndex}`
  }
  const {
    data: moreArticles, size, setSize, isValidating, mutate,
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
        <BackgroundArticleMobile />
      ) : <IntroDekstop />}

      <ContainerPadding className="relative pt-8 mb-24 -mt-16 bg-white rounded-xl lg:mt-8">
        {isMobile && <SearchBar className="mb-2 text-gray-500 bg-gray-400 bg-opacity-30" />}
        <OrderBy orderBy={selectedOrderBy} />
        <div className="mt-4">
          <MorePosts
            title={selectedTitleDescription.title}
            description={selectedTitleDescription.description}
            posts={moreArticles?.[0]}
            mutate={mutate}
          />
          <RenderMoreArticle data={moreArticles?.slice(1)} mutate={mutate} />
        </div>
        <LoadMoreButton onClickMore={handleLoadMore} isLoading={isValidating} />
      </ContainerPadding>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Index), {
  ssr: false,
})
