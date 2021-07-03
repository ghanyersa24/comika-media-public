import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import React, { ReactElement, useState } from 'react'
import { useSession, getSession } from 'next-auth/client'
import Container from '../../components/container-padding'
import PostBody from '../../components/post-body'
// import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_DETAIL_ARTICLE } from '../../res/api-endpoint'
import { PropsDetailOfPost } from '../../type'
import { PostCommentList, PostCommentAdd } from '../../components/blog/post-comment'
import { Get, add as addPost } from '../../service/comments'

export default function DetailOfPost({ post }: PropsDetailOfPost): ReactElement {
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
            <div className="max-w-2xl mx-auto">
              <PostCommentList
                comments={comments}
                isLoading={isLoading}
              />
              <PostCommentAdd
                onChange={(e) => setComment(e.target.value)}
                isLoading={isLoading}
                error={errorMsgPostAdd}
                comment={comment}
                onSubmit={handleSubmitPostComment}
              />
            </div>

          </article>
        </>
      )}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const post = await client.get(`${API_ENDPOINT_DETAIL_ARTICLE}/${context.params.slug}`,
    undefined, { token: session?.accessToken })
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
