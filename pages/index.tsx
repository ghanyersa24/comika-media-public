import React, { Component } from 'react'
import Head from 'next/head'
import Container from '../components/container'
import ContainerPadding from '../components/container-padding'
import MorePosts from '../components/more-posts'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import Navbar from '../components/blog/navigation/navbar'
import { client } from '../lib/clientRaw'
import { API_ENDPOINT_ARTICLE } from '../res/api-endpoint'

export default function Index({ data }) {
  const morePosts = data
  console.log('🚀 ~ file: index.tsx ~ line 17 ~ Index ~ morePosts', morePosts)
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
          {morePosts.length > 0 && <MorePosts posts={morePosts} title="Konten Terpoluler" />}
        </ContainerPadding>

        {/* </Container> */}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
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
