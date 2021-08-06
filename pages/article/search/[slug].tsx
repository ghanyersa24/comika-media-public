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
import ContainerPadding from '../../../components/container-padding'

import MorePosts from '../../../components/more-posts'
import BackgroundArticlePage from '../../../components/svg/BackgroundArticlePage'

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

      <ContainerPadding className="-mt-16 rounded-xl bg-white relative pt-8  lg:mt-8 mb-24">
        {isMobile && <SearchBar className="bg-gray-400 bg-opacity-30 text-gray-500 mb-2" />}
        <div className="mt-4">
          {articles.length > 0 && (
          <MorePosts
            posts={articles}
            title="Hasil Pencarian"
            description={`Kata kunci  "${slug}"`}
          />
          )}
        </div>
      </ContainerPadding>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const articles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?search=${context.params.slug}`)

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
