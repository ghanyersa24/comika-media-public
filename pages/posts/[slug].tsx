import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import React, { ReactElement, useState } from 'react'
import { getSession } from 'next-auth/client'
import Container from '../../components/container-padding'
import PostBody from '../../components/post-body'
// import Header from '../../components/header'
import { PostHeaderDekstop, PostHeaderMobile } from '../../components/post-header'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_DETAIL_ARTICLE } from '../../res/api-endpoint'
import { PropsDetailOfPost, Post } from '../../res/interface'
import { PostCommentList, PostCommentAdd } from '../../components/blog/post-comment'
import { Get, add as addPost } from '../../service/comments'
import Layout from '../../components/layout'

export const Dekstop = ({ post }:{post:Post}):ReactElement => {
  console.log('🚀 ~ file: [slug].tsx ~ line 49 ~ Dekstop ~ Dekstop', Dekstop)
  const {
    title, banner, updatedAt, Comika, content,
  } = post
  return (
    (
      <Container>
        <article className="mb-32 mt-24">
          <Head>
            <title>
              {title}
              {CMS_NAME}
            </title>
            {/* <meta property="og:image" content={post.ogImage.url} /> */}
          </Head>
          <PostHeaderDekstop
            title={title}
            coverImage={banner}
            date={updatedAt}
            Comika={Comika}
          />
          <PostBody content={content} />
        </article>
      </Container>

    )
  )
}

export const Mobile = ({ post }:{post:Post}):ReactElement => {
  console.log('🚀 ~ file: [slug].tsx ~ line 78 ~ Mobile ~ Mobile')
  const {
    title, banner, updatedAt, Comika, content,
  } = post
  return (
    (

      <article className="mb-32">
        <Head>
          <title>
            {title}
            {CMS_NAME}
          </title>
          {/* <meta property="og:image" content={post.ogImage.url} /> */}
        </Head>
        <PostHeaderMobile
          title={title}
          coverImage={banner}
          date={updatedAt}
          Comika={Comika}
        />
        <div className="mx-4 mt-8">
          <PostBody content={content} />
        </div>
      </article>

    )
  )
}

export default function DetailOfPost({ post, session, isMobile }: PropsDetailOfPost): ReactElement {
  console.log('🚀 ~ file: [slug].tsx ~ line 21 ~ DetailOfPost ~ session', session, isMobile)
  const router = useRouter()
  const [comment, setComment] = useState('')
  const [errorMsgPostAdd, setErrorMsgPostAdd] = useState()
  console.log('🚀 ~ file: [slug].tsx ~ line 23 ~ DetailOfPost ~ errorMsg', errorMsgPostAdd)
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const { data: comments, isLoading, mutate } = Get(post.slug)

  const handleSubmitPostComment = async () => {
    try {
      await addPost(post.slug, {
        comment,
      })
      mutate(); setComment(''); setErrorMsgPostAdd(null)
    } catch (error) {
      setErrorMsgPostAdd(error)
    }
  }

  return (
    <Layout isMobile={isMobile}>

      {/* <Header /> */}
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          {isMobile ? <Mobile post={post} /> : <Dekstop post={post} />}
          <div className="max-w-2xl mx-auto">
            <PostCommentList
              comments={comments}
              isLoading={isLoading}
            />
            {session ? (
              <PostCommentAdd
                onChange={(e) => setComment(e.target.value)}
                isLoading={isLoading}
                error={errorMsgPostAdd}
                comment={comment}
                onSubmit={handleSubmitPostComment}
              />
            ) : null}
          </div>
        </>
      )}

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const post = await client.get(`${API_ENDPOINT_DETAIL_ARTICLE}/${context.params.slug}`,
    undefined, { token: session?.accessToken })

  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
      session,
      isMobile,
    },
  }
}
