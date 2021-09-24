import Router, { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'
import useSWR from 'swr'
import classnames from 'classnames'
import Script from 'next/script'
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
import { SocialMediaShareButton } from '../../components/functional/button/social-media-share-button'
import { BookmarkButton } from '../../components/functional/button/bookmark'
import { LikeButton } from '../../components/functional/button/like'

export const Dekstop = ({ post }:{post:Post}):ReactElement => {
  console.log('🚀 ~ file: [slug].tsx ~ line 49 ~ Dekstop ~ Dekstop', Dekstop)
  const {
    title, banner, updatedAt, Comika, content, viewer, attribution, shared,
  } = post
  return (
    (
      <Container>
        <article className="md:my-16">
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
            shared={shared}
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
    title, banner, updatedAt, Comika, content, viewer, shared,
  } = post
  return (
    (

      <article className="mb-16">
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
          shared={shared}

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
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-8 mx-2 lg:max-w-2xl lg:mx-auto bg-gradient-to-b from-transparent via-white to-white">
          <h4 className="text-3xl font-medium leading-9 text-primary mt-52 ">Jadilah Bagian dari Kami!</h4>
          <p className="text-lg leading-loose text-center text-gray-700 ">Dapatkan akses tanpa batas ke seluruh artikel kami dengan berlangganan comikamedia.id</p>
          <button type="button" className="text-xl" onClick={() => Router.push('/subscribe')}>
            <img className="w-full " src="/assets/svg/Subscribe_Kecil.svg" />
          </button>
        </div>

      </>
    )
  }
  return null
}

export default function DetailOfPost({
  post, session, isMobile,
}: PropsDetailOfPost): ReactElement {
  let limit = 3
  if (isMobile) {
    limit = 2
  }
  useEffect(() => {
    window.instgrm.Embeds.process()
    twttr.widgets.load()
  }, [])
  const { data: postClient, mutate: mutatePost } = useSWR(`${API_ENDPOINT_DETAIL_ARTICLE}/${post.slug}`, client.get, { initialData: post })
  const { data: relatedArticle, mutate: mutateRelatedArticle } = useSWR(`${API_ENDPOINT_ARTICLE}?orderBy=popular&ordering=DESC&limit=${limit}&page=${1}`, client.get)
  const router = useRouter()
  const [comment, setComment] = useState('')
  const [errorMsgPostAdd, setErrorMsgPostAdd] = useState()
  if (!router.isFallback && !postClient?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const { data: comments, isLoading, mutate } = Get(postClient.slug)

  const handleSubmitPostComment = async () => {
    try {
      await addPost(postClient.slug, {
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
          <div className={classnames(
            'relative ', {
              'pb-36 md:pb-40': postClient?.withFlayer,
            },
          )}
          >
            {isMobile ? <Mobile post={postClient} /> : <Dekstop post={postClient} />}
            { postClient?.withFlayer ? <OverlayStopArticle isShow /> : null}
          </div>
          <div className="mx-4 md:max-w-2xl md:mx-auto">

            <div className="inline-block mb-8 divide-y md:my-12">
              <div className="pb-4">
                <SocialMediaShareButton size={32} slug={postClient.slug} />
              </div>
              <div className="flex items-center pt-4">
                <LikeButton
                  slug={postClient.slug}
                  liked={postClient.liked}
                  mutate={() => mutatePost()}
                />
                <span className="text-sm md:text-base">{postClient.likes}</span>
                <BookmarkButton
                  slug={postClient.slug}
                  bookmarked={postClient.bookmarked}
                  mutate={() => mutatePost()}
                  className="ml-4"
                />

              </div>
            </div>

            <div className="px-4 pb-24">
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

          </div>

          <Container className="mt-8 mb-24 md:mt-12">
            {relatedArticle?.length > 0 && <MorePosts mutate={() => mutateRelatedArticle()} posts={relatedArticle} title="Rekomendasi Artikel" description="Rekomendasi Artikel untuk anda" />}
            <div className="mt-8 text-right">
              <button type="button" onClick={handleLoadMore} className="px-2 text-base leading-tight md:text-lg text-primary ">Lihat artikel lainnya</button>
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
