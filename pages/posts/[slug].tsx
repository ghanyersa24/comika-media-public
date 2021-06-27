import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import React from 'react'
import Container from '../../components/container-padding'
import PostBody from '../../components/post-body'
// import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_DETAIL_ARTICLE, API_ENDPOINT_LIST_ARTICLE_LIMIT } from '../../res/api-endpoint'
import { PropsDetailOfPost } from '../../type'

export default function DetailOfPost({ post }:PropsDetailOfPost):React.ReactNode {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Container>
      {/* <Header /> */}
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="mb-32 mt-24">
            <Head>
              <title>
                {post.title}
                {CMS_NAME}
              </title>
              {/* <meta property="og:image" content={post.ogImage.url} /> */}
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.banner}
              date={post.updatedAt}
            />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('🚀 ~ file: [slug].tsx ~ line 58 ~ constgetStaticProps:GetStaticProps= ~ post', params)
  const post = await client.get(`${API_ENDPOINT_DETAIL_ARTICLE}/${params.slug}`)
  console.log('🚀 ~ file: [slug].tsx ~ line 59 ~ constgetStaticProps:GetStaticProps= ~ post', post)
  // const post = await client.get(params.slug, [
  //   'title',
  //   'date',
  //   'slug',
  //   'author',
  //   'content',
  //   'ogImage',
  //   'coverImage',
  // ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client.get(`${API_ENDPOINT_LIST_ARTICLE_LIMIT}`)
  console.log('🚀 ~ file: [slug].tsx ~ line 82 ~ constgetStaticPaths:GetStaticPaths= ~ posts', posts)
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
