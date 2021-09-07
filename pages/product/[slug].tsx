import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import router from 'next/router'
import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { BiArrowBack } from 'react-icons/bi'
import { IoMdBasket } from 'react-icons/io'
import SwipeableViews from 'react-swipeable-views'
import { client } from '../../lib/clientRaw'
import markdownToHtml from '../../lib/markdownToHtml'
import { API_ENDPOINT_STORE } from '../../res/api-endpoint'
import Layout from '../../components/layout'
import { ItemStoreType } from '../../res/interface'

type props = {
  itemstore:ItemStoreType,
  isMobile:boolean
}
const ImageProduct = ({ url }) => (
  <Image
    src={url}
    alt="photo profil "
    layout="responsive"
    className=""
    width={120}
    height={120}
  />
)

export const Product:FunctionComponent<props> = ({ isMobile, itemstore }) => {
  console.log('🚀 ~ file: [slug].tsx ~ line 20 ~ itemstore', itemstore)
  return (
  // <Layout isMobile={isMobile}>
    <div>
      <SwipeableViews
        enableMouseEvents
        className=""
        slideClassName=""
      >
        {itemstore.images.length ? itemstore.images.map((image) => (
          <ImageProduct url={image.url} key={image.url} />
        ))
          : <ImageProduct url="https://via.placeholder.com/62x62" />}

      </SwipeableViews>

      <div className="absolute inset-x-0 top-0 flex justify-between px-4 pt-4">
        <button onClick={() => router.back()} type="button" className="p-2 text-xl bg-white rounded-lg shadow">
          <BiArrowBack />
        </button>
        <button onClick={() => router.back()} type="button" className="p-2 text-xl bg-white rounded-lg shadow">
          <IoMdBasket />
        </button>
      </div>
      <div className="absolute w-full px-4 py-8 -mt-8 bg-white rounded-2xl ">
        <p className="mt-2 mb-1 title-store">{itemstore.Category.name}</p>
        <p className="text-2xl text-gray-900">{itemstore.name}</p>
        <div className="flex items-center ">
          <p className="flex-1 text-2xl font-bold text-primary">{itemstore.rupiah}</p>
          <div className="flex items-center px-2 pb-1 text-3xl rounded-full bg-bgGrayLight">
            <button type="button" className="w-12 px-4 py-2 font-bold ">
              -
            </button>
            <span>1</span>
            <button type="button" className="w-12 px-4 py-2 font-bold text-primary ">
              +
            </button>
          </div>
        </div>
        {/* <div>
          <p className="mt-6 mb-1 title-store">Ukuran</p>
          <button type="button" className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold text-white border bg-primary border-primary rounded-xl ">S</button>
          <button type="button" className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">M</button>
          <button type="button" className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">L</button>
          <button type="button" className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">Xl</button>
          <button type="button" className="inline-flex items-center justify-center w-12 h-12 mr-2 text-lg font-bold border text-primary border-primary rounded-xl ">XXL</button>
        </div> */}
        <div>
          <p className="mt-6 mb-1 title-store">Deskripsi</p>
          <p className="leading-relaxed text-gray-500 xtext-base">
            {itemstore.description}
          </p>
        </div>
        <div className="flex justify-between mt-8 text-lg ">
          <button type="button" className="px-4 py-2 border border-gray-200 rounded-md">
            Tambah ke Keranjang
          </button>
          <button type="button" className="px-4 py-2 text-white rounded-md bg-primary">
            Beli Sekarang
            {' '}
          </button>
        </div>
      </div>
    </div>
  // </Layout>
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
