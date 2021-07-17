import '../styles/index.css'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import { Provider } from 'next-auth/client'
import type { AppProps /* , AppContext */ } from 'next/app'
import { ReactElement } from 'react'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps):ReactElement {
  const router = useRouter()
  const urlComponent = router.route.split('/')
  console.log('🚀 ~ file: _app.js ~ line 8 ~ MyApp ~ urlComponent', urlComponent)
  const withOutLayout = ['auth', 'agent', 'test']
  return (
    <>
      <Provider
        session={pageProps.session}
        options={{
          clientMaxAge: 60,
          keepAlive: 0,
        }}
      >
        <SWRConfig
          value={{
            refreshInterval: 1000 * 60 * 2,
            revalidateOnFocus: false,
          }}
        >
          {withOutLayout.includes(urlComponent[1]) ? (
            <Component {...pageProps} />
          ) : (
            <Layout url={urlComponent}>
              <Component {...pageProps} />
            </Layout>
          )}
        </SWRConfig>
      </Provider>
    </>
  )
}
export default MyApp
