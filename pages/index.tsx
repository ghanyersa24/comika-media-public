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

type Props= {
  lastestArticles:Post[],
  pupularArticles:Post[],
  anotherArticles:Post[],
}
export default function Index(
  { lastestArticles, pupularArticles, anotherArticles }:Props,
): React.ReactNode {
  console.log('🚀 ~ file: index.tsx ~ line 21 ~ anotherArticles', anotherArticles)
  console.log('🚀 ~ file: index.tsx ~ line 21 ~ pupularArticles', pupularArticles)
  console.log('🚀 ~ file: index.tsx ~ line 21 ~ lastestArticles', lastestArticles)
  return (
    <>
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const lastestArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${6}&page=${1}`)
  const pupularArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=popular&ordering=DESC&limit=${6}&page=${1}`)
  const anotherArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${6}&page=${2}`)
  if (!lastestArticles) {
    return {
      notFound: true,
    }
  }
  // will be passed to the page component as props
  return {
    props: { lastestArticles, pupularArticles, anotherArticles },
  }
}
