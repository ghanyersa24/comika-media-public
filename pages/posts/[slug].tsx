import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Container from '../../components/container-padding'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { client } from '../../lib/clientRaw'
import { API_ENDPOINT_ARTICLE } from '../../res/api-endpoint'

type Post = {
  'id': string,
  'userId': string,
  'title': string,
  'slug': string,
  'banner': string,
  'isPremium': boolean,
  'isPublish': boolean,
  'content':string,
  'createdAt': Date,
  'updatedAt': Date,
  'deletedAt': Date,
  'UserId': Date
}
type Props = {
  post: Post,
  // morePosts: string[]
}
export default function DetailOfPost({ post }: Props):any {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title}
                  {' '}
                  | Next.js Blog Example with
                  {CMS_NAME}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.banner}
                date={post.updatedAt}
                // author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await client.get(`${API_ENDPOINT_ARTICLE}/${params.slug}`)
  // const post = await client.get(params.slug, [
  //   'title',
  //   'date',
  //   'slug',
  //   'author',
  //   'content',
  //   'ogImage',
  //   'coverImage',
  // ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client.get(`${API_ENDPOINT_ARTICLE}`)
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
