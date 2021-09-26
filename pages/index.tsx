/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import dynamic from 'next/dynamic'
import useSWR, { useSWRInfinite } from 'swr'
import React, { } from 'react'
import router from 'next/router'
import mobile from 'is-mobile'
import ContainerPadding from '../components/container-padding'
import {
  MorePosts, TitlePost,
} from '../components/more-posts'
// import { IntroDekstop, IntroMobile } from '../components/intro'
import { client } from '../lib/clientRaw'
import { API_ENDPOINT_ARTICLE, API_ENDPOINT_STORE } from '../res/api-endpoint'
import Layout from '../components/layout'

import { RenderMoreArticle } from '../components/blog/more-articles'
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from '../res/string'
import { SubsribeBanner } from '../components/banner/subscribe-banner'
import { ItemStores } from '../components/items/item-store'
import { ContainerStore } from '../components/container/container-store'
import { ItemStoreType } from '../res/interface'

const SearchNavigation = dynamic(() => import('../components/blog/navigation/search-navigation-mobile') as any, { ssr: false })

const IntroDekstop = dynamic(() => import('../components/intro/intro-dekstop') as any, { ssr: false })
const IntroMobile = dynamic(() => import('../components/intro/intro-mobile') as any, { ssr: false })

const isMobile = mobile()
export default function Index(): React.ReactNode {
  const limit = isMobile ? LIMIT_MOBILE : LIMIT_DEKSTOP
  const { data: lastestArticles, mutate: mutateLastestArticles } = useSWR(`${API_ENDPOINT_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${limit}&page=${1}`, client.get)
  const { data: pupularArticles, mutate: mutatePopularArticles } = useSWR(`${API_ENDPOINT_ARTICLE}?orderBy=popular&ordering=DESC&limit=${limit}&page=${1}`, client.get)
  const { data: digitalStores } = useSWR<ItemStoreType[]>(`${API_ENDPOINT_STORE}?orderBy=name&ordering=DESC&limit=${3}&page=${1}&category=1`, client.get)
  const { data: merchandiseStores } = useSWR<ItemStoreType[]>(`${API_ENDPOINT_STORE}?orderBy=name&ordering=DESC&limit=${3}&page=${1}&category=3`, client.get)
  console.log('🚀 ~ file: index.tsx ~ line 35 ~ PupularStores', digitalStores)
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
        <title>Comika Media</title>
      </Head>
      {/* <Container> */}
      {isMobile ? (
        <>
          <SearchNavigation />
          <IntroMobile />
        </>
      ) : <IntroDekstop />}

      <ContainerPadding className="mt-8 mb-24 md:mt-12 ">
        <MorePosts posts={lastestArticles} mutate={mutateLastestArticles} title="Artikel Terbaru" description="Terbaru di minggu ini" />
        <SubsribeBanner
          isShow
          onClick={() => router.push('/subscribe')}
          isMobile={isMobile}
          src={isMobile ? '/assets/blog/subscribe/Subscribe_Kecil.png' : '/assets/svg/Subscribe_Kecil.svg'}
        />
        <ContainerStore
          className="my-8"
          title="Digital produk"
          titleDescription="Produk populer minggu ini"
        >
          <ItemStores digitalStores={digitalStores} isMobile={isMobile} />
        </ContainerStore>
        <MorePosts posts={pupularArticles} mutate={mutatePopularArticles} title="Artikel Terpopuler" description="Terpopuler di minggu ini" />

        <ContainerStore
          className="my-8"
          title="Merchandise"
          titleDescription="Merchandise populer minggu ini"
        >
          <ItemStores digitalStores={merchandiseStores} isMobile={isMobile} />
        </ContainerStore>
        <TitlePost title="Artikel Lainya" description="Lainya di minggu ini" />
        <RenderMoreArticle data={moreArticles} mutate={mutateMoreArticles} />

        <div className="mt-8 text-right">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isValidating}
            className="px-2 text-base leading-tight md:text-lg text-primary "
          >
            {isValidating ? 'loading' : 'Lihat artikel lainnya'}
          </button>
        </div>

      </ContainerPadding>
    </Layout>
  )
}
