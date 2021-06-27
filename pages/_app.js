import '../styles/index.css'
import { useRouter } from 'next/router'
import Layout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const urlComponent = router.route.split('/')
  console.log('🚀 ~ file: _app.js ~ line 8 ~ MyApp ~ urlComponent', urlComponent)
  const withOutLayout = ['auth']
  return (
    <>
      {withOutLayout.includes(urlComponent[1]) ? (
        <Component {...pageProps} />
      ) : (
        <Layout url={urlComponent}>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  )
}
