/* eslint-disable react/destructuring-assignment */
import Head from "next/head";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import React, { useState } from "react";
import router from "next/router";
import mobile from "is-mobile";
import { GetStaticProps } from "next";
import ContainerPadding from "../components/container-padding";
import { MorePosts, TitlePost } from "../components/more-posts";
// import { IntroDekstop, IntroMobile } from '../components/intro'
import { client } from "../lib/clientRaw";
import {
  API_ENDPOINT_ARTICLE,
  API_ENDPOINT_JUMBOTRON,
  API_ENDPOINT_STORE,
} from "../res/api-endpoint";
import Layout from "../components/layout";

import { RenderMoreArticle } from "../components/blog/more-articles";
import { LIMIT_DEKSTOP, LIMIT_MOBILE } from "../res/string";
import { ItemStores } from "../components/items/item-store";
import { ContainerStore } from "../components/container/container-store";
import { ItemStoreType, Post } from "../res/interface";
import { toast } from "react-toastify";
// import { SubsribeBanner } from '../components/banner/subscribe-banner'

const SubsribeBannerDekstop = dynamic(
  () => import("../components/banner/subscribe-banner-dektop"),
  { ssr: true }
);
const SubsribeBannerMobile = dynamic(
  () => import("../components/banner/subscribe-banner-mobile"),
  { ssr: true }
);
const NewLetter = dynamic(() => import("../components/banner/NewLetter"), {
  ssr: true,
});

const SearchNavigation = dynamic(
  () => import("../components/blog/navigation/search-navigation-mobile"),
  { ssr: true }
);

const IntroDekstop = dynamic(
  () => import("../components/intro/intro-dekstop"),
  { ssr: true }
);
const IntroMobile = dynamic(() => import("../components/intro/intro-mobile"), {
  ssr: true,
});

const isMobile = mobile();

type props = {
  jumbotronFromSSR: string;
  lastestArticlesSSR: Post[];
  pupularArticlesSSR: Post[];
};

const limit = isMobile ? LIMIT_MOBILE : LIMIT_DEKSTOP;
const lastestArticlesInitialUrl = `${API_ENDPOINT_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${limit}&page=${1}`;
const pupularArticlesInitialUrl = `${API_ENDPOINT_ARTICLE}?orderBy=popular&ordering=DESC&limit=${limit}&page=${1}`;

export default function Index({
  jumbotronFromSSR,
  lastestArticlesSSR,
  pupularArticlesSSR,
}: props): React.ReactNode {
  const { data: lastestArticles, mutate: mutateLastestArticles } = useSWR<
    Post[]
  >(lastestArticlesInitialUrl, client.get, {
    fallbackData: lastestArticlesSSR,
  });
  const { data: pupularArticles, mutate: mutatePopularArticles } = useSWR<
    Post[]
  >(pupularArticlesInitialUrl, client.get, {
    fallbackData: pupularArticlesSSR,
  });
  const { data: digitalStores } = useSWR<ItemStoreType[]>(
    `${API_ENDPOINT_STORE}?orderBy=name&ordering=DESC&limit=${3}&page=${1}&category=digital produk`,
    client.get
  );
  const { data: merchandiseStores } = useSWR<ItemStoreType[]>(
    `${API_ENDPOINT_STORE}?orderBy=name&ordering=DESC&limit=${3}&page=${1}&category=Merchandise`,
    client.get
  );

  // pagination
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${API_ENDPOINT_ARTICLE}?orderBy=createdAt&ordering=DESC&limit=${limit}&page=${
      2 + pageIndex
    }`;
  };
  const {
    data: moreArticles,
    size,
    setSize,
    isValidating,
    mutate: mutateMoreArticles,
  } = useSWRInfinite(getKey, client.get);
  const handleLoadMore = () => {
    setSize(size + 1);
  };

  const [newsLetterLoading, setNewsLetterLoading] = useState(false);

  const onSubmit = async (email: string) => {
    setNewsLetterLoading(true);
    try {
      const res = await client.post("/article/email-subscription", { email });
      toast.success(res.msg);
    } catch (e) {}
    setNewsLetterLoading(false);
  };

  return (
    <Layout isMobile={isMobile}>
      <Head>
        <title>Comika Media</title>
      </Head>
      {/* <Container> */}
      {isMobile ? (
        <>
          <SearchNavigation />
          <IntroMobile jumbotrons={jumbotronFromSSR} />
        </>
      ) : (
        <IntroDekstop jumbotrons={jumbotronFromSSR} />
      )}

      <ContainerPadding className="mt-8 mb-24 md:mt-12 ">
        <MorePosts
          posts={lastestArticles}
          mutate={mutateLastestArticles}
          title="Artikel Terbaru"
          description="Terbaru di minggu ini"
        />
        {isMobile ? (
          <SubsribeBannerMobile
            isShow={!lastestArticles?.[0]?.isPremium}
            onClick={() => router.push("/subscribe")}
            src="/assets/blog/subscribe/Subscribe_Kecil.png"
          />
        ) : (
          <SubsribeBannerDekstop
            isShow={!lastestArticles?.[0]?.isPremium}
            onClick={() => router.push("/subscribe")}
            src="/assets/svg/Subscribe_Kecil.svg"
          />
        )}
        {digitalStores.length > 0 && (
          <ContainerStore
            className="my-8"
            title="Digital produk"
            titleDescription="Produk populer minggu ini"
          >
            <ItemStores digitalStores={digitalStores} isMobile={isMobile} />
          </ContainerStore>
        )}

        <MorePosts
          posts={pupularArticles}
          mutate={mutatePopularArticles}
          title="Artikel Terpopuler"
          description="Terpopuler di minggu ini"
        />
        <NewLetter onSubmit={onSubmit} loading={newsLetterLoading} />
        {merchandiseStores.length > 0 && (
          <ContainerStore
            className="my-8"
            title="Merchandise"
            titleDescription="Merchandise populer minggu ini"
          >
            <ItemStores digitalStores={merchandiseStores} isMobile={isMobile} />
          </ContainerStore>
        )}
        <TitlePost
          title="Artikel Lainnya"
          description="Lainnya di minggu ini"
        />
        <RenderMoreArticle data={moreArticles} mutate={mutateMoreArticles} />

        <div className="mt-8 text-right">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isValidating}
            className="px-2 text-base leading-tight md:text-lg text-primary "
          >
            {isValidating ? "loading" : "Lihat artikel lainnya"}
          </button>
        </div>
      </ContainerPadding>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<{
  props: props;
  revalidate: number;
}> => {
  const jumbotronFromSSR = await client.get(
    `${API_ENDPOINT_JUMBOTRON}`,
    undefined
  );
  const lastestArticlesSSR = await client.get(
    lastestArticlesInitialUrl,
    undefined
  );
  const pupularArticlesSSR = await client.get(
    pupularArticlesInitialUrl,
    undefined
  );

  return {
    props: {
      jumbotronFromSSR,
      lastestArticlesSSR,
      pupularArticlesSSR,
    },
    revalidate: 60,
  };
};
