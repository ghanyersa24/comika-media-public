/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import React, { } from 'react'
import { useRouter } from 'next/router'
import { title } from 'process'
import MorePosts from '../../components/more-posts'
import { IntroDekstop } from '../../components/intro'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_LIST_ARTICLE } from '../../res/api-endpoint'
import { Post } from '../../res/interface'
import Layout from '../../components/layout'
import { SearchBar } from '../../components/blog/navigation/search-bar'
import { OrderBy } from '../../components/blog/navigation/ordering-by'
import BackgroundArticlePage from '../../components/svg/BackgroundArticlePage'
import ContainerPadding from '../../components/container-padding'

const titleDescription = {
  popular: {
    title: 'Terpopular', description: 'Artikel terpopuler saat ini',
  },
  createdAt: {
    title: 'Semua Artikel', description: 'Semua artikel yang ada di komika',
  },
}
type Props= {
  articles:Post[],
  isMobile:boolean
}
export default function Index(
  {
    articles, isMobile,
  }:Props,
): React.ReactNode {
  const router = useRouter()
  const { orderBy } = router.query
  const selectedOrderBy = titleDescription?.[orderBy as string] ? orderBy as string : 'createdAt'
  const selectedTitleDescription = titleDescription[selectedOrderBy]
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

      <ContainerPadding className="-mt-16 rounded-xl bg-white relative pt-8  lg:mt-8 mb-24">
        <SearchBar className="bg-gray-400 bg-opacity-30 text-gray-500 mb-2" />
        <OrderBy orderBy={selectedOrderBy} />
        <div className="mt-4">
          {articles.length > 0 && (
          <MorePosts
            posts={articles}
            title={selectedTitleDescription.title}
            description={selectedTitleDescription.description}
          />
          )}
        </div>
      </ContainerPadding>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('🚀 ~ file: index.tsx ~ line 50 ~ constgetServerSideProps:GetServerSideProps= ~ context', context)
  const orderBy = context.query?.orderBy || 'createdAt'
  const articles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=${orderBy}&ordering=DESC&limit=${10}&page=${1}`)
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  if (!articles) {
    return {
      notFound: true,
    }
  }
  // will be passed to the page component as props
  return {
    props: {
      articles, isMobile,
    },
  }
}
