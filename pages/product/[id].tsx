import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import router from 'next/router'
import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { BiArrowBack } from 'react-icons/bi'
import { IoMdBasket } from 'react-icons/io'
import { client } from '../../lib/clientRaw'
import markdownToHtml from '../../lib/markdownToHtml'
import { API_ENDPOINT_DETAIL_ARTICLE } from '../../res/api-endpoint'
import Layout from '../../components/layout'

type productType = {
  isMobile:boolean
}

export const Product:FunctionComponent<productType> = ({ isMobile }) => {
  console.log('🚀 ~ file: [id].tsx ~ line 16 ~ Product', Product)
  return (
  // <Layout isMobile={isMobile}>
    <div>
      <Image
        src="https://via.placeholder.com/375x414"
        alt="photo profil "
        layout="responsive"
        className=""
        width={120}
        height={120}
      />
      <div className="absolute inset-x-0 top-0 flex justify-between px-4 pt-4">
        <button onClick={() => router.back()} type="button" className="bg-white p-2 text-xl rounded-lg shadow">
          <BiArrowBack />
        </button>
        <button onClick={() => router.back()} type="button" className="bg-white p-2  text-xl rounded-lg shadow">
          <IoMdBasket />
        </button>
      </div>
      <div className="bg-white absolute -mt-8 rounded-2xl w-full py-8 px-4  ">
        <p className="title-store mt-2 mb-1">Marchendise</p>
        <p className="text-2xl text-gray-900">KOMOIDOUMENOI WORLD TOUR - Black, S</p>
        <div className="flex items-center ">
          <p className="text-2xl font-bold text-primary flex-1">Rp 150.000</p>
          <div className="bg-bgGrayLight flex items-center text-3xl pb-1 px-2 rounded-full">
            <button type="button" className="w-12 font-bold py-2 px-4 ">
              -
            </button>
            <span>1</span>
            <button type="button" className="w-12 font-bold py-2 px-4  text-primary ">
              +
            </button>
          </div>
        </div>
        <div>
          <p className="title-store mt-6 mb-1">Ukuran</p>
          <button type="button" className="border text-white bg-primary border-primary inline-flex w-12 h-12 justify-center items-center rounded-xl text-lg font-bold mr-2 ">S</button>
          <button type="button" className="border text-primary border-primary inline-flex w-12 h-12 justify-center items-center rounded-xl text-lg font-bold mr-2 ">M</button>
          <button type="button" className="border text-primary border-primary inline-flex w-12 h-12 justify-center items-center rounded-xl text-lg font-bold mr-2 ">L</button>
          <button type="button" className="border text-primary border-primary inline-flex w-12 h-12 justify-center items-center rounded-xl text-lg font-bold mr-2 ">Xl</button>
          <button type="button" className="border text-primary border-primary inline-flex w-12 h-12 justify-center items-center rounded-xl text-lg font-bold mr-2 ">XXL</button>
        </div>
        <div>
          <p className="title-store mt-6 mb-1">Deskripsi</p>
          <p className=" leading-relaxed text-gray-500  xtext-base">
            PENTING!!
            <br />
            Beberapa Merchandise bertanda tangan Pandji Pragiwaksono secara random
            dikirimkan untuk pembelian pada tanggal 25 - 30 Juli. Mungkin salah satunya Merch Kamu!
          </p>
        </div>
        <div className="flex justify-between mt-8 text-lg ">
          <button type="button" className="py-2 px-4   rounded-md border border-gray-200">
            Tambah ke Keranjang
          </button>
          <button type="button" className="py-2 px-4 bg-primary rounded-md text-white">
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
  // const post = await client.get(`${API_ENDPOINT_DETAIL_ARTICLE}/${context.params.slug}`,
  //   undefined, { token: session?.accessToken })

  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  // const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        // ...post,
        // content,
      },
      session,
      isMobile,
    },
  }
}
