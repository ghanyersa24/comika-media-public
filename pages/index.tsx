import React, { Component } from 'react'
import Head from 'next/head'
import Container from '../components/container'
import ContainerPadding from '../components/container-padding'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import Navbar from '../components/blog/navigation/navbar'

export default function Index({ allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Komika Media</title>
        </Head>
        <Container>
          <Navbar />
          <Intro />
          <ContainerPadding>
            {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
            )}
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </ContainerPadding>

        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
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
