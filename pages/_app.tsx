import '../styles/index.css'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import { Provider } from 'next-auth/client'
import type { AppProps /* , AppContext */ } from 'next/app'
import { ReactElement } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { store } from '../store'

import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps):ReactElement {
  const router = useRouter()
  const urlComponent = router.route.split('/')
  console.log('🚀 ~ file: _app.js ~ line 8 ~ MyApp ~ urlComponent', urlComponent)
  return (
    <ReduxProvider store={store}>
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
          <Component {...pageProps} />
          <ToastContainer />

        </SWRConfig>
      </Provider>
    </ReduxProvider>
  )
}
export default MyApp
