/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import ContainerPadding from '../components/container-padding'
import MorePosts from '../components/more-posts'
import Intro from '../components/intro'
import { client } from '../lib/clientRaw'
import { API_ENDPOINT_LIST_ARTICLE_LIMIT } from '../res/api-endpoint'
import { Post } from '../type'

type Props= {
  data:Post[],
}
export default function Index({ data }:Props): React.ReactNode {
  return (
    <>
      <Head>
        <title>Komika Media</title>
      </Head>
      {/* <Container> */}

      <Intro />
      <ContainerPadding className="mt-12">
        {data.length > 0 && <MorePosts posts={data} title="Konten Terpoluler" />}
      </ContainerPadding>

      {/* </Container> */}
    </>
  )
}

export const getServerSideProps: GetStaticProps = async () => {
  const data = await client.get(`${API_ENDPOINT_LIST_ARTICLE_LIMIT}`)
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}
