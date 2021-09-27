/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import React, { } from 'react'
import mobile from 'is-mobile'
// import { IntroDekstop, IntroMobile } from '../components/intro'
import Layout from '../components/layout'

const isMobile = mobile()
export default function Index() {
  return (
    <Layout isMobile={isMobile}>
      <Head>
        <title>Comika Media</title>
      </Head>
      <div className="flex items-center justify-center h-screen">
        <img src="/assets/404.svg" alt="" />
      </div>
    </Layout>
  )
}
