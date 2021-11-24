import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import React, { FunctionComponent, useState } from 'react'
import mobile from 'is-mobile'
import dynamic from 'next/dynamic'
import useSWR, { mutate } from 'swr'
import { toast } from 'react-toastify'
import router from 'next/router'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_ADD_CART, API_ENDPOINT_CART, API_ENDPOINT_STORE } from '../../res/api-endpoint'
import { ItemStoreType } from '../../res/interface'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import Layout from '../../components/layout'
import { ContainerStore } from '../../components/container/container-store'
import { ItemStores } from '../../components/items/item-store'

const ProductDekstop = dynamic(() => import('../../components/card/product-detail/dekstop'), { ssr: false })
const ProductMobile = dynamic(() => import('../../components/card/product-detail/product-detail-mobile'), { ssr: false })

const isMobile = mobile()

type props = {
  itemstore:ItemStoreType,
  isMobile:boolean
}

export const Product:FunctionComponent<props> = ({ itemstore }) => {
  const { data: anotherProducts } = useSWR<ItemStoreType[]>(`${API_ENDPOINT_STORE}?orderBy=name&ordering=DESC&limit=${3}&page=${1}&category=3`, client.get)
  const [isDisabled, setIsDisabled] = useState(false)
  const handleClickCart = async () => {
    setIsDisabled(true)
    await client.post(`${API_ENDPOINT_ADD_CART}/${itemstore.id}`, {
      qty: 1,
      note: null,
    })
    toast.success('Berhasil menambahkan ke keranjang', {
      position: 'bottom-right', autoClose: 2000,
    })
    await mutate(API_ENDPOINT_CART)
    setIsDisabled(false)
  }
  const handleClickBuy = async () => {
    setIsDisabled(true)
    await client.post(`${API_ENDPOINT_ADD_CART}/${itemstore.id}`, {
      qty: 1,
      note: null,
    })
    await mutate(API_ENDPOINT_CART)
    router.push('/cart')
    setIsDisabled(false)
  }

  const detailProduct = isMobile ? (
    <ProductMobile
      itemstore={itemstore}
      onClickCart={handleClickCart}
      onClickBuy={handleClickBuy}
      isDisabled={isDisabled}
    />
  ) : (
    <ProductDekstop
      itemstore={itemstore}
      onClickCart={handleClickCart}
      onClickBuy={handleClickBuy}
      isDisabled={isDisabled}
    />
  )
  const content = (
    <>
      {detailProduct}
      <ContainerStore
        className="pb-16 mx-4 my-8 md:pb-0 md:max-w-screen-lg md:mx-auto"
        title="Kamu mungkin juga suka"
      >
        <ItemStores digitalStores={anotherProducts} isMobile={isMobile} />
        <div className="mt-4 text-right">
          <button
            type="button"
          // onClick={handleLoadMore}
            className="px-2 text-base leading-tight md:text-lg text-primary "
          >
            Lihat artikel lainnya
          </button>
        </div>
      </ContainerStore>
    </>
  )
  if (isMobile) return content
  return (
    <Layout isMobile={isMobile} className="pb-12 md:pt-24 bg-gray-50 ">
      {content}
    </Layout>
  )
}

export default Product

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const itemstore = await client.get(`${API_ENDPOINT_STORE}/${context.params.slug}`)
  // const content = await markdownToHtml(post.content || '')

  return {
    props: {
      itemstore,
      session,
    },
  }
}
