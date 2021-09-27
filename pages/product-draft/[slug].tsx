/* eslint-disable max-len */
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import router from 'next/router'
import React, { FunctionComponent, useState } from 'react'
import Image from 'next/image'
import { BiArrowBack } from 'react-icons/bi'
import { IoMdBasket } from 'react-icons/io'
import SwipeableViews from 'react-swipeable-views'
import InnerImageZoom from 'react-inner-image-zoom'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_STORE } from '../../res/api-endpoint'
import { ItemStoreType } from '../../res/interface'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import Layout from '../../components/layout'

type props = {
  itemstore:ItemStoreType,
  isMobile:boolean
}
const ImageProductMobile = ({ url }) => (
  <Image
    src={url}
    alt="photo profil "
    layout="responsive"
    className=""
    width={120}
    height={120}
  />
)

const Content = ({ itemstore }) => (
  <>
    <p className="mt-2 mb-1 title-store">{itemstore.Category.name}</p>
    <p className="text-2xl text-gray-900">{itemstore.name}</p>
    <div className="flex items-center ">
      <p className="flex-1 text-2xl font-bold text-primary">{itemstore.rupiah}</p>
    </div>
    {/* <div>
            <p className="mt-6 mb-1 title-store">Ukuran</p>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold text-white border bg-primary border-primary rounded-xl ">S</button>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">M</button>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">L</button>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">Xl</button>
            <button type="button"
            className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">XXL</button>
          </div> */}
    <div className="mt-6 mb-1 ">
      <p className="title-store">Deskripsi</p>
      <p className="leading-relaxed text-gray-500 xtext-base">
        {itemstore.description}
      </p>
    </div>
  </>
)

const ProductMobile = ({ itemstore }) => (
  // <Layout isMobile={isMobile}>
  <div>
    <SwipeableViews
      enableMouseEvents
      className=""
      slideClassName=""
    >
      {itemstore.images.length ? itemstore.images.map((image) => (
        <ImageProductMobile url={image.url} key={image.url} />
      ))
        : <ImageProductMobile url="/background/download.webp" />}

    </SwipeableViews>

    <div className="absolute inset-x-0 top-0 flex justify-between px-4 pt-4">
      <button onClick={() => router.back()} type="button" className="p-2 text-xl bg-white rounded-lg shadow">
        <BiArrowBack />
      </button>
      <button onClick={() => router.back()} type="button" className="p-2 text-xl bg-white rounded-lg shadow">
        <IoMdBasket />
      </button>
    </div>
    <div className="relative w-full px-4 pt-8 pb-24 -mt-8 bg-white rounded-2xl">
      <Content itemstore={itemstore} />
      <div className="mt-6 mb-1 ">
        <p className="title-store">Kamu mungkin juga suka</p>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex justify-between px-4 py-2 mt-8 bg-white shadow hp:text-lg ">
        <button type="button" className="w-1/2 px-4 py-2 mr-2 border border-gray-200 rounded-md">
          + Keranjang
        </button>
        <button type="button" className="w-1/2 px-4 py-2 ml-2 text-white rounded-md bg-primary">
          Beli Sekarang
          {' '}
        </button>
      </div>
    </div>
  </div>
  // </Layout>
)

const ProductDekstop = ({ itemstore }) => {
  console.log('ProductDekstop -> itemstore', itemstore)
  const [selectedImage, setSelectedImage] = useState(itemstore.images[0].url)
  return (
    <div className="flex max-w-screen-lg p-2 mx-auto bg-white shadow-md lg:p-4">
      <div className="flex-shrink-0 mr-4 w-96">
        {/* <Image
          src={selectedImage}
          alt="photo profil "
          layout="intrinsic"
          className="rounded"
          width={384}
          height={384}
        /> */}
        <InnerImageZoom src={selectedImage} zoomSrc={selectedImage} zoomType="hover" />
        <div className="w-full mt-2 overflow-y-auto">
          {itemstore.images.length && itemstore.images.map((image) => (
            <button type="button" onClick={() => setSelectedImage(image.url)} key={image.url} className="mr-2 rounded">
              <Image
                src={image.url}
                alt="photo profil "
                layout="intrinsic"
                className="rounded"
                width={96}
                height={96}
              />
            </button>
          ))}

        </div>
      </div>
      <div className="relative w-full px-4 pb-24 mt-0 bg-white ">
        <Content itemstore={itemstore} />
        <div className="absolute inset-x-0 bottom-0 flex px-4 py-2 mt-8">
          <button type="button" className="px-6 py-2 mr-2 border rounded-md border-primary text-primary">
            Tambah Keranjang
          </button>
          <button type="button" className="px-6 py-2 ml-2 text-white rounded-md bg-primary">
            Beli Sekarang
            {' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export const Product:FunctionComponent<props> = ({ isMobile, itemstore }) => {
  console.log('🚀 ~ file: [slug].tsx ~ line 20 ~ itemstore', itemstore)
  if (isMobile) {
    return (
      <ProductMobile itemstore={itemstore} />
    )
  }
  return (
    <Layout isMobile={isMobile} className="pt-24 pb-12 bg-gray-50 ">
      <ProductDekstop itemstore={itemstore} />
    </Layout>
  )
}

export default Product

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const itemstore = await client.get(`${API_ENDPOINT_STORE}/${context.params.slug}`)
  //   undefined, { token: session?.accessToken })

  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  // const content = await markdownToHtml(post.content || '')

  return {
    props: {
      itemstore,
      session,
      isMobile,
    },
  }
}
