/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import React, { } from 'react'
import ContainerPadding from '../components/container-padding'
import MorePosts from '../components/more-posts'
import { IntroDekstop, IntroMobile } from '../components/intro'
import { client } from '../lib/clientRaw'
import { API_ENDPOINT_LIST_ARTICLE } from '../res/api-endpoint'
import { Post } from '../res/interface'
import Layout from '../components/layout'
import SearchNavigation from '../components/blog/navigation/search-navigation-mobile'

type Props= {
  lastestArticles:Post[],
  pupularArticles:Post[],
  anotherArticles:Post[],
  isMobile:boolean
}
export default function Index(
  {
    lastestArticles, pupularArticles, anotherArticles, isMobile,
  }:Props,
): React.ReactNode {
  return (
    <Layout isMobile={isMobile}>
      <Head>
        <title>Komika Media</title>
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
        {anotherArticles.length > 0 && <MorePosts posts={anotherArticles} title="Artikel Lainya" description="Lainya di minggu ini" />}
      </ContainerPadding>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))
  let limit = 15
  if (isMobile) {
    limit = 12
  }
  const lastestArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${limit}&page=${1}`)
  const pupularArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=popular&ordering=DESC&limit=${limit}&page=${1}`)
  const anotherArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${limit}&page=${2}`)

  if (!lastestArticles) {
    return {
      notFound: true,
    }
  }
  // will be passed to the page component as props
  return {
    props: {
      lastestArticles, pupularArticles, anotherArticles, isMobile,
    },
  }
}
