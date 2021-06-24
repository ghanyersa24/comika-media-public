/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import ContainerPadding from '../components/container-padding'
import MorePosts from '../components/more-posts'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Navbar from '../components/blog/navigation/navbar'
import { client } from '../lib/clientRaw'
import { API_ENDPOINT_ARTICLE } from '../res/api-endpoint'
import { Post } from '../type'

export default function Index(data :Post[]): React.ReactNode {
  console.log('🚀 ~ file: index.tsx ~ line 17 ~ Index ~ morePosts', data)

  return (
    <>
      <Layout>
        <Head>
          <title>Komika Media</title>
        </Head>
        {/* <Container> */}
        <Navbar />
        <Intro />
        <ContainerPadding className="mt-12">
          {data.length > 0 && <MorePosts posts={data} title="Konten Terpoluler" />}
        </ContainerPadding>

        {/* </Container> */}
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get(API_ENDPOINT_ARTICLE)
  console.log('🚀 ~ file: index.tsx ~ line 39 ~ getStaticProps ~ res', data)
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}
