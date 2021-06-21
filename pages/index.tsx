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

export default function Index({ allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
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
  const res = await client.get('/article/')
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
