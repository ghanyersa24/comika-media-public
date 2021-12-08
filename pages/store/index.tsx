/* eslint-disable react/destructuring-assignment */
import useSWRInfinite from 'swr/infinite'

import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import mobile from 'is-mobile'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_JUMBOTRON, API_ENDPOINT_STORE } from '../../res/api-endpoint'
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from '../../res/string'
import Layout from '../../components/layout'
import { OrderBy } from '../../components/blog/navigation/ordering-by'
import ContainerPadding from '../../components/container-padding'
import { LoadMoreButton } from '../../components/blog/button/load-more'
import { SearchBar } from '../../components/blog/navigation/search-bar'
import { ItemStoreType } from '../../res/interface'
import { ItemStores } from '../../components/items/item-store'
import { TitlePost } from '../../components/more-posts'

const isMobile = mobile()

const BackgroundArticleMobile = dynamic(() => import('../../components/background/background-article-mobile'), { ssr: false })
const IntroDekstop = dynamic(() => import('../../components/intro/intro-dekstop'), { ssr: false })

const navigationsOrderBy = [
  {
    name: 'Semua', url: undefined,
  },
  {
    name: 'Digital', url: 'digital produk',
  },
  {
    name: 'Merchandise', url: 'Merchandise',
  },
]

type props = {
  jumbotronFromSSR:string,
}

const Index = ({ jumbotronFromSSR }:props) :ReactElement => {
  const limit = isMobile ? LIMIT_MOBILE : LIMIT_DEKSTOP
  const router = useRouter()
  const { category, search } = router.query
  const searchParam = search ? `&search=${search}` : ''
  const NameOfNavigationsOrderBy = navigationsOrderBy.find(
    (navigation) => navigation.url === category,
  )?.name

  // pagination
  const categoryParams = category ? `&category=${category}` : ''
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `${API_ENDPOINT_STORE}?${searchParam}${categoryParams}&ordering=DESC&limit=${limit}&page=${1 + pageIndex}`
  }
  const {
    data: moreArticles, size, setSize, isValidating,
  } = useSWRInfinite<ItemStoreType[]>(getKey, client.get)
  const handleLoadMore = () => {
    setSize(size + 1)
  }

  return (
    <Layout isMobile={isMobile} title="Store">
      {/* <Container> */}
      {isMobile ? (
        <BackgroundArticleMobile />
      ) : <IntroDekstop jumbotrons={jumbotronFromSSR} />}

      <ContainerPadding className="relative pt-8 mb-24 -mt-16 bg-white rounded-xl lg:mt-8">
        {isMobile && (
        <SearchBar
          onSubmit={(searchInput) => router.push(`/store?search=${searchInput}`)}
          searchValue={search as string}
          className="mb-2 text-gray-500 bg-gray-400 bg-opacity-30"
        />
        )}
        <OrderBy
          filterValue={category as string}
          searchParam={searchParam}
          navigations={navigationsOrderBy}
          subUrl="/store"
          filterBy="category"
        />
        <TitlePost
          title={NameOfNavigationsOrderBy}
          description={`Produk ${search ? `dengan kata kunci "${search}" ${NameOfNavigationsOrderBy}` : NameOfNavigationsOrderBy}`}
        />
        <div className="mt-4">
          {
            moreArticles?.map((item) => (
              <ItemStores digitalStores={item} key={Math.random()} isMobile={isMobile} />
            ))
          }
        </div>
        <LoadMoreButton onClickMore={handleLoadMore} isLoading={isValidating} title="Lihar produk lainnya" />
      </ContainerPadding>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Index), {
  ssr: false,
})

export const getStaticProps: GetStaticProps = async ():
Promise<{props:props, revalidate:number}> => {
  const jumbotronFromSSR = await client.get(`${API_ENDPOINT_JUMBOTRON}`, undefined)

  return {
    props: {
      jumbotronFromSSR,
    },
    revalidate: 60,
  }
}
