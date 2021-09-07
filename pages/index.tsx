/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import useSWR, { useSWRInfinite } from 'swr'
import React, { } from 'react'
import router from 'next/router'
import ContainerPadding from '../components/container-padding'
import {
  MorePosts, TitlePost,
} from '../components/more-posts'
import { IntroDekstop, IntroMobile } from '../components/intro'
import { client } from '../lib/clientRaw'
import { API_ENDPOINT_ARTICLE } from '../res/api-endpoint'
import Layout from '../components/layout'
import SearchNavigation from '../components/blog/navigation/search-navigation-mobile'
import { RenderMoreArticle } from '../components/blog/more-articles'
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from '../res/string'
import { SubsribeBanner } from '../components/banner/subscribe-banner'
import { ItemStore } from '../components/items/item-store'
import { ContainerStore } from '../components/container/container-store'

type Props= {
  isMobile:boolean,
  limit:number
}

export default function Index(
  {
    isMobile, limit,
  }:Props,
): React.ReactNode {
  const { data: lastestArticles, mutate: mutateLastestArticles } = useSWR(`${API_ENDPOINT_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${limit}&page=${1}`, client.get)
  const { data: pupularArticles, mutate: mutatePopularArticles } = useSWR(`${API_ENDPOINT_ARTICLE}?orderBy=popular&ordering=DESC&limit=${limit}&page=${1}`, client.get)
  // pagination
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${API_ENDPOINT_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${limit}&page=${2 + pageIndex}`
  }
  const {
    data: moreArticles, size, setSize, isValidating, mutate: mutateMoreArticles,
  } = useSWRInfinite(getKey, client.get)
  const handleLoadMore = () => {
    setSize(size + 1)
  }
  return (
    <Layout isMobile={isMobile}>
      <Head>
        <title>Komika Media</title>
      </Head>
      {/* <Container> */}
      {isMobile ? (
        <>
          <SearchNavigation />
          <IntroMobile />
        </>
      ) : <IntroDekstop />}

      <ContainerPadding className="mt-8 md:mt-12 mb-24 ">
        <MorePosts posts={lastestArticles} mutate={mutateLastestArticles} title="Artikel Terbaru" description="Terbaru di minggu ini" />
        <SubsribeBanner
          isShow
          onClick={() => router.push('/subscribe')}
          isMobile={isMobile}
          src={isMobile ? '/assets/blog/subscribe/Subscribe_Kecil.png' : '/assets/svg/Subscribe_Kecil.svg'}
        />
        <ContainerStore
          className="mb-8"
          title="Digital produk"
          titleDescription="Produk populer minggu ini"
        >
          <ItemStore onClick />
          <ItemStore onClick />
          <ItemStore onClick />
        </ContainerStore>
        <MorePosts posts={pupularArticles} mutate={mutatePopularArticles} title="Artikel Terpopuler" description="Terpopuler di minggu ini" />
        <ContainerStore
          className="mb-8"
          title="Digital produk"
          titleDescription="Produk populer minggu ini"
        >
          <ItemStore onClick />
          <ItemStore onClick />
          <ItemStore onClick />
        </ContainerStore>
        <TitlePost title="Artikel Lainya" description="Lainya di minggu ini" />
        <RenderMoreArticle data={moreArticles} mutate={mutateMoreArticles} />

        <div className="text-right mt-8">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isValidating}
            className="text-base px-2 md:text-lg leading-tight text-primary "
          >
            {isValidating ? 'loading' : 'Lihat artikel lainnya'}
          </button>
        </div>

      </ContainerPadding>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))
  const limit = isMobile ? LIMIT_MOBILE : LIMIT_DEKSTOP

  // will be passed to the page component as props
  return {
    props: {
      isMobile, limit,
    },
  }
}
