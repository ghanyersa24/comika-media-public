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
import { API_ENDPOINT_DETAIL_ARTICLE, API_ENDPOINT_ARTICLE } from '../../res/api-endpoint'
import { PropsDetailOfPost, Post } from '../../res/interface'
import { PostCommentList, PostCommentAdd } from '../../components/blog/post-comment'
import { Get, add as addPost } from '../../service/comments'
import Layout from '../../components/layout'
import { MorePosts } from '../../components/more-posts'

export const Dekstop = ({ post }:{post:Post}):ReactElement => {
  console.log('🚀 ~ file: [slug].tsx ~ line 49 ~ Dekstop ~ Dekstop', Dekstop)
  const {
    title, banner, updatedAt, Comika, content, viewer, attribution,
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
            views={viewer}
            attribution={attribution}

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
    title, banner, updatedAt, Comika, content, viewer,
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
          views={viewer}

        />
        <div className="mx-4 mt-8">
          <PostBody content={content} />
        </div>
      </article>

    )
  )
}

const OverlayStopArticle = ({ isShow }) => {
  if (isShow) {
    return (
      <>
        <div className=" lg:max-w-2xl mx-2 lg:mx-auto bg-gradient-to-b  from-transparent via-white to-white  absolute inset-x-0 bottom-0 flex flex-col justify-end items-center pb-8">
          <h4 className="text-primary text-3xl font-medium leading-9 mt-52 ">Jadilah Bagian dari Kami!</h4>
          <p className="text-lg leading-loose text-gray-700 text-center ">Dapatkan akses tanpa batas ke seluruh artikel kami dengan berlangganan comikamedia.id</p>
          <img className=" w-full " src="/assets/blog/subscribe/subscribe.png" />
        </div>

      </>
    )
  }
  return null
}
export default function DetailOfPost({
  post, session, isMobile, relatedArticle,
}: PropsDetailOfPost): ReactElement {
  console.log('🚀 ~ file: [slug].tsx ~ line 98 ~ DetailOfPost ~ post', post)
  const router = useRouter()
  const [comment, setComment] = useState('')
  const [errorMsgPostAdd, setErrorMsgPostAdd] = useState()
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
  const handleLoadMore = () => {
    router.push('/article')
  }

  return (
    <Layout isMobile={isMobile}>

      {/* <Header /> */}
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <div className="relative pb-36 lg:pb-40 ">
            {isMobile ? <Mobile post={post} /> : <Dekstop post={post} />}
            { post?.withFlayer ? <OverlayStopArticle isShow /> : null}
          </div>
          <div className="max-w-2xl mx-auto px-4 pb-24">
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
          <Container className="mt-8 md:mt-12 mb-24">
            {relatedArticle.length > 0 && <MorePosts posts={relatedArticle} title="Rekomendasi Artikel" description="Rekomendasi Artikel untuk anda" />}
            <div className="text-right mt-8">
              <button type="button" onClick={handleLoadMore} className="text-base px-2 md:text-lg leading-tight text-primary ">Lihat artikel lainnya</button>
            </div>
          </Container>
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
  let limit = 3
  if (isMobile) {
    limit = 2
  }
  const relatedArticle = await client.get(`${API_ENDPOINT_ARTICLE}?orderBy=popular&ordering=DESC&limit=${limit}&page=${1}`)

  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
      session,
      relatedArticle,
      isMobile,
    },
  }
}
