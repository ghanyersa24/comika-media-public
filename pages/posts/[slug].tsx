/* eslint-disable max-len */
import Router, { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react'
import { getSession, signIn } from 'next-auth/client'
import useSWR from 'swr'
import classnames from 'classnames'
import Script from 'next/script'
import { Disclosure, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import Container from '../../components/container-padding'
import PostBody from '../../components/post-body'
// import Header from '../../components/header'
import { PostHeaderDekstop, PostHeaderMobile } from '../../components/post-header'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import { client } from '../../lib/clientRaw'
import {
  API_ENDPOINT_DETAIL_ARTICLE, API_ENDPOINT_ARTICLE, API_ENDPOINT_COMMENT, API_ENDPOINT_PROFILE,
} from '../../res/api-endpoint'
import {
  PropsDetailOfPost, Post, CommentType, Profile,
} from '../../res/interface'
import { PostCommentList, PostCommentAdd, PostInitialCommentAddDesktop } from '../../components/blog/post-comment'
import { add as addPost } from '../../service/comments'
import Layout from '../../components/layout'
import { MorePosts } from '../../components/more-posts'
import { SocialMediaShareButton } from '../../components/functional/button/social-media-share-button'
import { BookmarkButton } from '../../components/functional/button/bookmark'
import { LikeButton } from '../../components/functional/button/like'
import { findCommentById } from '../../helper/comment'
import { setComment, setModalValue } from '../../slices/comment'

declare global {
  interface Window { instgrm: any; }
}
declare let twttr: any

export const Dekstop = ({ post }:{post:Post}):ReactElement => {
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
          <PostBody isMobile={false} content={content} />
        </article>
      </Container>

    )
  )
}

export const Mobile = ({ post }:{post:Post}):ReactElement => {
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
          <PostBody isMobile content={content} />
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
          <p className="text-lg leading-loose text-center text-gray-700 ">Dapatkan akses tanpa batas ke seluruh artikel kami dengan berlangganan comika.media</p>
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

  const dispatch = useDispatch()
  const { data: postClient, mutate: mutatePost } = useSWR(`${API_ENDPOINT_DETAIL_ARTICLE}/${post.slug}`, client.get, { fallbackData: post })
  const { data: relatedArticle, mutate: mutateRelatedArticle } = useSWR(`${API_ENDPOINT_ARTICLE}?orderBy=popular&ordering=DESC&limit=${limit}&page=${1}`, client.get)
  const { data: comments, error: errorComment, mutate: mutateComment } = useSWR<CommentType[]>(() => (postClient?.slug ? `${API_ENDPOINT_COMMENT}/${postClient.slug}` : null), client.get, { refreshInterval: 1000 * 60, revalidateOnFocus: true })
  const { data: profile } = useSWR<Profile>(() => (session ? `${API_ENDPOINT_PROFILE}` : null), client.get)
  const [isCommentLoading, setIsCommentLoading] = useState(false)
  const router = useRouter()
  const [errorMsgPostAdd, setErrorMsgPostAdd] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [parrentCommentId, setParrentComment] = useState('')
  const { commentId } = router.query
  const [isScrolledToCommendId, setIsScrolledToCommendId] = useState(false)

  const commentRef = useRef([])
  // const scrollToRef = (ref:MutableRefObject<any[]>) => {
  //   ref.current['6b0d4ef4-fcf0-4b4a-a9e8-94cea378f073'].scrollIntoView({ behavior: 'smooth' })
  // }

  useEffect(() => {
    window.instgrm = window.instgrm || {}
    // eslint-disable-next-line no-undef
    if (window?.instgrm?.Embeds && twttr?.widgets && postClient) {
      window.instgrm.Embeds.process()
      twttr.widgets.load()
    }
  }, [])

  useEffect(() => {
    if (isModalOpen === false) {
      setTimeout(() => {
        setParrentComment('')
      }, 200)
    }
  }, [isModalOpen])

  // SCROLL TO COMMENT
  useEffect(() => {
    const currentRef = commentRef.current?.[commentId as string]
    console.log('CCMM', !!commentId, !!comments, !!currentRef, !isScrolledToCommendId)
    if (commentId && comments && currentRef && !isScrolledToCommendId) {
      currentRef.scrollIntoView({ behavior: 'smooth', block: isMobile ? 'start' : 'center' })
      setIsScrolledToCommendId(true)
    }
  }, [comments, commentId, isMobile, isScrolledToCommendId])

  if (!router.isFallback && !postClient?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const handleSubmitPostComment = async (comment:string) => {
    if (!session) signIn()

    try {
      setIsCommentLoading(true)
      await addPost(postClient.slug, {
        comment,
        commentId: parrentCommentId,
      })
      await mutateComment(); setErrorMsgPostAdd(null)
      setIsModalOpen(false)
      dispatch(setComment(''))
      dispatch(setModalValue(''))
    } catch (error) {
      setErrorMsgPostAdd(error)
    } finally {
      setIsCommentLoading(false)
    }
  }
  const handleLoadMore = () => {
    router.push('/article')
  }

  return (
    <Layout isMobile={isMobile} isUserBottomNavbar={false}>
      <Script
        id="embedig"
        src="https://www.instagram.com/embed.js"
      />
      <Script
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
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

            <div className="inline-block w-full mt-8 mb-8 divide-y md:my-12">
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

            <Disclosure defaultOpen>
              {({ open }) => (
                <>
                  {/* { (open && !session) && toast.info('Harap Login terlebih dahulu', {

                    onClose: () => signIn(),
                    autoClose: 5000,
                  })} */}
                  {/* <p className="hidden -mx-4 text-4xl font-medium leading-10 text-primary md:block">Komentar</p> */}
                  <div className="-mx-4 md:-mx-0">
                    <Disclosure.Button className="relative w-full px-4 py-4 text-base text-justify text-gray-400 border-b-2 border-white bg-slate-100 ">
                      <div>{open ? 'Tutup kolom komentar' : 'Tampilkan kolom komentar'}</div>
                      <div className="absolute left-0 right-0 h-1 bg-slate-200 -bottom-1.5 " />
                    </Disclosure.Button>
                  </div>

                  <Transition
                    enter="transition duration-100 "
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Disclosure.Panel>
                      <div className="pt-4 pb-24 ">
                        {!isMobile && (
                        <PostInitialCommentAddDesktop
                          profile={profile}
                          onSubmit={handleSubmitPostComment}
                          isLoading={isCommentLoading}
                          initialComment=""
                        />
                        )}
                        <PostCommentList
                          comments={comments}
                          commentRef={commentRef}
                          isLoading={!errorComment && !comments}
                          onClickReply={(id: string) => {
                            setIsModalOpen(true)
                            setParrentComment(id)
                          }}
                        />
                        <PostCommentAdd
                          isLoading={isCommentLoading}
                          error={errorMsgPostAdd}
                          initialComment=""
                          onSubmit={handleSubmitPostComment}
                          isMobile={isMobile}
                          isOpen={isModalOpen}
                          onResetParrentComment={() => setParrentComment('')}
                          onCloseModal={() => {
                            setIsModalOpen(false)
                          }}
                          parrentComment={findCommentById(comments, parrentCommentId)}
                        />
                      </div>

                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>

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

  return {
    props: {
      post: {
        ...post,
      },
      session,
      isMobile,
    },
  }
}
