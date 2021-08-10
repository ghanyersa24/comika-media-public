/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useSWRInfinite } from 'swr'

import React, { } from 'react'
import { useRouter } from 'next/router'
import { title } from 'process'
import { TitlePost } from '../../components/more-posts'
import { IntroDekstop } from '../../components/intro'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_LIST_ARTICLE } from '../../res/api-endpoint'
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from '../../res/string'
import Layout from '../../components/layout'
import { SearchBar } from '../../components/blog/navigation/search-bar'
import { OrderBy } from '../../components/blog/navigation/ordering-by'
import BackgroundArticlePage from '../../components/svg/BackgroundArticlePage'
import ContainerPadding from '../../components/container-padding'
import { RenderMoreArticle } from '../../components/blog/more-articles'
import { LoadMoreButton } from '../../components/blog/button/load-more'

const titleDescription = {
  popular: {
    title: 'Terpopular', description: 'Artikel terpopuler saat ini',
  },
  createdAt: {
    title: 'Semua Artikel', description: 'Semua artikel yang ada di comika media',
  },
}
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
  const { orderBy } = router.query
  const selectedOrderBy = titleDescription?.[orderBy as string] ? orderBy as string : 'createdAt'
  const selectedTitleDescription = titleDescription[selectedOrderBy]

  // pagination
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${API_ENDPOINT_LIST_ARTICLE}?orderBy=${orderBy}&ordering=DESC&limit=${limit}&page=${pageIndex}`
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
        <div className="bg-primary pt-8 pb-20 text-center relative">
          <BackgroundArticlePage className="absolute -top-4" />
          <h1 className="text-xl font-bold leading-relaxed text-white">Artikel</h1>
        </div>
      ) : <IntroDekstop />}

      <ContainerPadding className="-mt-16 rounded-xl bg-white relative pt-8  lg:mt-8 mb-24">
        {isMobile && <SearchBar className="bg-gray-400 bg-opacity-30 text-gray-500 mb-2" />}
        <OrderBy orderBy={selectedOrderBy} />
        <div className="mt-4">
          <TitlePost
            title={selectedTitleDescription.title}
            description={selectedTitleDescription.description}
          />
          <RenderMoreArticle data={moreArticles} />
        </div>
        <LoadMoreButton onClickMore={handleLoadMore} isLoading={isValidating} />
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
