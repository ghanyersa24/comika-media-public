/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import useSWRInfinite from 'swr/infinite'

import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { title } from 'process'
import mobile from 'is-mobile'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import { MorePosts } from '../../components/more-posts'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_ARTICLE, API_ENDPOINT_JUMBOTRON } from '../../res/api-endpoint'
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from '../../res/string'
import Layout from '../../components/layout'
import { OrderBy } from '../../components/blog/navigation/ordering-by'
import ContainerPadding from '../../components/container-padding'
import { RenderMoreArticle } from '../../components/blog/more-articles'
import { LoadMoreButton } from '../../components/blog/button/load-more'
import { SearchBar } from '../../components/blog/navigation/search-bar'

const isMobile = mobile()

const BackgroundArticleMobile = dynamic(() => import('../../components/background/background-article-mobile'), { ssr: false })
const IntroDekstop = dynamic(() => import('../../components/intro/intro-dekstop'), { ssr: false })

const titleDescription = {
  popular: {
    title: 'Terpopular', description: 'terpopuler saat ini',
  },
  createdAt: {
    title: 'Terbaru', description: 'terbaru saat ini',
  },
}
const navigationsOrderBy = [
  {
    name: 'All', url: 'createdAt',
  },
  {
    name: 'Most populer', url: 'popular',
  },
]
type props = {
  jumbotronFromSSR:string,
}
const Index = ({ jumbotronFromSSR }:props) :ReactElement => {
  const limit = isMobile ? LIMIT_MOBILE : LIMIT_DEKSTOP
  const router = useRouter()
  const { orderBy, search } = router.query
  const searchParam = search ? `&search=${search}` : ''
  const selectedOrderBy = titleDescription?.[orderBy as string] ? orderBy as string : 'createdAt'
  const selectedTitleDescription = titleDescription[selectedOrderBy]

  // pagination
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${API_ENDPOINT_ARTICLE}?${searchParam}&orderBy=${orderBy}&ordering=DESC&limit=${limit}&page=${1 + pageIndex}`
  }
  const {
    data: moreArticles, size, setSize, isValidating, mutate,
  } = useSWRInfinite(getKey, client.get)
  const handleLoadMore = () => {
    setSize(size + 1)
  }

  return (
    <Layout isMobile={isMobile} title="Article">
      <Head>
        <title>Comika Media</title>
      </Head>
      {/* <Container> */}
      {isMobile ? (
        <BackgroundArticleMobile />
      ) : <IntroDekstop jumbotrons={jumbotronFromSSR} />}

      <ContainerPadding className="relative pt-8 mb-24 -mt-16 bg-white rounded-xl lg:mt-8">
        {isMobile && (
        <SearchBar
          onSubmit={(searchInput) => router.push(`/article?search=${searchInput}`)}
          searchValue={search as string}
          className="mb-2 text-gray-500 bg-gray-400 bg-opacity-30"
        />
        )}
        <OrderBy
          filterValue={selectedOrderBy}
          searchParam={searchParam}
          navigations={navigationsOrderBy}

        />
        <div className="mt-4">
          <MorePosts
            title={searchParam ? 'Hasil Pencarian' : selectedTitleDescription.title}
            description={`Artikel ${searchParam ? `dengan kata kunci "${search}" ${selectedTitleDescription.description}`
              : selectedTitleDescription.description}`}
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

export const getStaticProps: GetStaticProps = async ():
Promise<{props:props, revalidate:number}> => {
  const jumbotronFromSSR = await client.get(`${API_ENDPOINT_JUMBOTRON}`, undefined)

  return {
    props: {
      jumbotronFromSSR,
    },
    revalidate: 60,
  }
}
