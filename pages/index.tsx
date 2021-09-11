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
import { API_ENDPOINT_ARTICLE, API_ENDPOINT_STORE } from '../res/api-endpoint'
import Layout from '../components/layout'
import SearchNavigation from '../components/blog/navigation/search-navigation-mobile'
import { RenderMoreArticle } from '../components/blog/more-articles'
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from '../res/string'
import { SubsribeBanner } from '../components/banner/subscribe-banner'
import { ItemStoreMobile, ItemStores } from '../components/items/item-store'
import { ContainerStore } from '../components/container/container-store'
import { ItemStoreType } from '../res/interface'

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
  const { data: digitalStores, mutate: mutatePopularStores } = useSWR<ItemStoreType[]>(`${API_ENDPOINT_STORE}?orderBy=name&ordering=DESC&limit=${3}&page=${1}&category=1`, client.get)
  const { data: merchandiseStores, mutate: mutateMerchandiseStores } = useSWR<ItemStoreType[]>(`${API_ENDPOINT_STORE}?orderBy=name&ordering=DESC&limit=${3}&page=${1}&category=3`, client.get)
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
          className="mb-8"
          title="Merchandise"
          titleDescription="Produk populer minggu ini"
        >
          {merchandiseStores?.map((popularStore) => (
            <ItemStoreMobile
              key={popularStore.id}
              imageUrl={popularStore.images[0]?.url}
              title={popularStore.name}
              price={popularStore.price}
              type={popularStore.Category.name}
              onClick={() => router.push(`/product/${popularStore.slug}`)}

            />
          ))}
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
