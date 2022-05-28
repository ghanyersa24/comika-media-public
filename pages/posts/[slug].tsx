/* eslint-disable max-len */
import Router, { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import { getSession, signIn } from 'next-auth/client'
import useSWR from 'swr'
import classnames from 'classnames'
import Script from 'next/script'
import { Disclosure, Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
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

// const dummyComment = [
//   {
//     id: 'd6cda4f4-b97d-4acc-8ab23-add366cd90e',
//     comment: 'Konsepan ceritanya menurut saya sudah bagus',
//     createdAt: '2022-05-06T07:52:16.660Z',
//     User: {
//       photo: 'http://api.comika.media/uploads/Fahri-Ta_220204100537.jpeg',
//       id: '0734f6b2-6b4c-45b9-be8c-d1aaf6803348',
//       name: 'Ghany Abdillah Ersa',
//     },
//     replies: [
//       {
//         id: 'd6cda4f4-b97d-4acc-8ab2-eadd2366cd90e',
//         parentId: 'd6cda4f4-b97d-4acc-8ab2-eadd366cd90e',
//         comment: ' lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem!',
//         createdAt: '2021-06-06T07:52:16.660Z',
//         User: {
//           photo: 'data:image/jpeg;base64,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',
//           id: '0734f6b2-6b4c-45b9-be8c-d1aaf6803348',
//           name: 'Ghany Abdillah Ersa',
//         },
//       },
//       {
//         id: 'd6cda4f4-b97d-4acc-8ab2-eadd366c490e',
//         parentId: 'd6cda4f4-b97d-4acc-8ab2-eadd366cd90e',
//         comment: ' lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem!',
//         createdAt: '2021-06-06T07:52:16.660Z',
//         User: {
//           photo: 'http://api.comika.media/uploads/Fahri-Ta_220204100537.jpeg',
//           id: '0734f6b2-6b4c-45b9-be8c-d1aaf6803348',
//           name: 'Ghany Abdillah Ersa',
//         },
//       },
//     ],
//   },
//   {
//     id: '1c67c264-5e72-44f1-90f2-fca8c449993b',
//     comment: 'lorem ipsum dolor sit amet consectetur adipisicing e
// lit. Quisquam, quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem!',
//     createdAt: '2022-05-01T07:52:16.660Z',
//     User: {
//       photo: 'http://api.comika.media/uploads/Fahri-Ta_220204100537.jpeg',
//       id: '0734f6b2-6b4c-45b9-be8c-d1aaf6803348',
//       name: 'Ghany Abdillah Ersa',
//     },
//     replies: [],
//   },
//   {
//     id: '1c67c264-5e72-44f1-90f2-fca8c449992b',
//     comment: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Qu dolor sit amet consectetur adipisicing elit. Quisquam, quidem!',
//     createdAt: '2021-07-06T07:52:03.148Z',
//     User: {
//       photo: 'http://api.comika.media/uploads/Fahri-Ta_220204100537.jpeg',
//       id: '0734f6b2-6b4c-45b9-be8c-d1aaf6803348',
//       name: 'Ghany Abdillah Ersa',
//     },
//     replies: [],
//   },

// ] as CommentType[]
export default function DetailOfPost({
  post, session, isMobile,
}: PropsDetailOfPost): ReactElement {
  let limit = 3
  if (isMobile) {
    limit = 2
  }
  const { data: postClient, mutate: mutatePost } = useSWR(`${API_ENDPOINT_DETAIL_ARTICLE}/${post.slug}`, client.get, { fallbackData: post })
  const { data: relatedArticle, mutate: mutateRelatedArticle } = useSWR(`${API_ENDPOINT_ARTICLE}?orderBy=popular&ordering=DESC&limit=${limit}&page=${1}`, client.get)
  const { data: comments, error: errorComment, mutate: mutateComment } = useSWR<CommentType[]>(() => (postClient?.slug ? `${API_ENDPOINT_COMMENT}/${postClient.slug}` : null), client.get, { refreshInterval: 1000 * 60, revalidateOnFocus: true })
  const { data: profile } = useSWR<Profile>(() => (session ? `${API_ENDPOINT_PROFILE}` : null), client.get)
  const [isCommentLoading, setIsCommentLoading] = useState(false)
  const router = useRouter()
  const [errorMsgPostAdd, setErrorMsgPostAdd] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [parrentCommentId, setParrentComment] = useState('')

  useEffect(() => {
    window.instgrm = window.instgrm || {}
    // if (isMobile === false) setIsModalOpen(true)

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

  if (!router.isFallback && !postClient?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const handleSubmitPostComment = async (comment:string) => {
    try {
      setIsCommentLoading(true)
      await addPost(postClient.slug, {
        comment,
        commentId: parrentCommentId,
      })
      await mutateComment(); setErrorMsgPostAdd(null)
      setIsModalOpen(false)
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

            <Disclosure defaultOpen={!isMobile}>
              {({ open }) => (
                <>
                  { (open && isMobile && !session) && toast.info('Harap Login terlebih dahulu', {

                    onClose: () => signIn(),
                    autoClose: 5000,
                  })}
                  <p className="hidden -mx-4 text-4xl font-medium leading-10 text-primary md:block">Komentar</p>
                  <div className="-mx-4 md:hidden ">
                    <Disclosure.Button className="relative w-full px-4 py-4 text-base text-justify text-gray-400 bg-gray-100 border-b-2 border-white ">
                      <div>{open ? 'Tutup kolom komentar' : '10 Komentar dari Ridwan dan lainnya'}</div>
                      <div className="absolute left-0 right-0 h-1 bg-gray-200 -bottom-1.5 " />
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
                        />
                        )}
                        <PostCommentList
                          comments={comments}
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
