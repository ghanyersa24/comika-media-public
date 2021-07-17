/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import ContainerPadding from '../components/container-padding'
import MorePosts from '../components/more-posts'
import Intro from '../components/intro'
import { client } from '../lib/clientRaw'
import { API_ENDPOINT_LIST_ARTICLE } from '../res/api-endpoint'
import { Post } from '../res/interface'
import Layout from '../components/layout'

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

      <Intro />
      <ContainerPadding className="mt-12">
        {lastestArticles.length > 0 && <MorePosts posts={lastestArticles} title="Artikel Terbaru" />}
        {pupularArticles.length > 0 && <MorePosts posts={pupularArticles} title="Artikel Terpopuler" />}
        {anotherArticles.length > 0 && <MorePosts posts={anotherArticles} title="Artikel Lainya" />}
      </ContainerPadding>

      {/* </Container> */}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const lastestArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${6}&page=${1}`)
  const pupularArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=popular&ordering=DESC&limit=${6}&page=${1}`)
  const anotherArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${6}&page=${2}`)
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
      lastestArticles, pupularArticles, anotherArticles, isMobile,
    },
  }
}
