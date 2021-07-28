/* eslint-disable react/destructuring-assignment */
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import React, { } from 'react'
import ContainerPadding from '../../components/container-padding'
import MorePosts from '../../components/more-posts'
import { IntroDekstop, IntroMobile } from '../../components/intro'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_LIST_ARTICLE } from '../../res/api-endpoint'
import { Post } from '../../res/interface'
import Layout from '../../components/layout'
import SearchNavigation from '../../components/blog/navigation/search-navigation-mobile'

type Props= {
  searchArticles:Post[],
  isMobile:boolean
}
export default function Index(
  {
    searchArticles, isMobile,
  }:Props,
): React.ReactNode {
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

      <ContainerPadding className="mt-8 md:mt-12 mb-24">
        {searchArticles.length > 0 && <MorePosts posts={searchArticles} title="Result" description="Hasil pencarian" />}
      </ContainerPadding>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchArticles = await client.get(`${API_ENDPOINT_LIST_ARTICLE}?search=${context.params.slug}`)

  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  if (!searchArticles) {
    return {
      notFound: true,
    }
  }
  // will be passed to the page component as props
  return {
    props: {
      searchArticles, isMobile,
    },
  }
}
