import '../styles/index.css'
import '../styles/animate.css'
import dynamic from 'next/dynamic'
// import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import type { AppProps /* , AppContext */ } from 'next/app'
import { ReactElement } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '../store'
import 'nprogress/nprogress.css'
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "next-auth/client";


const TopProgressBar = dynamic(() => import("../components/topLoadingBar"), {
  ssr: false,
});


function MyApp({ Component, pageProps }: AppProps): ReactElement {
  // const router = useRouter()
  // const urlComponent = router.route.split('/')
  const persistor = persistStore(store)
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider
          session={pageProps.session}
          options={{
            clientMaxAge: 60,
            keepAlive: 5 * 10,
          }}
        >
          <SWRConfig
            value={{
              refreshInterval: 1000 * 60 * 2,
              revalidateOnFocus: false,
            }}
          >
            <TopProgressBar />
            <Component {...pageProps} />
            <ToastContainer />

          </SWRConfig>
        </Provider>
      </PersistGate>
    </ReduxProvider>
  );
}
export default MyApp;
