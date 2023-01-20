import "../styles/index.css";
import dynamic from "next/dynamic";
// import { useRouter } from 'next/router'
import { SWRConfig } from "swr";
import { Provider } from "next-auth/client";
import type { AppProps /* , AppContext */ } from "next/app";
import { ReactElement } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "../store";
import "nprogress/nprogress.css";

import "react-toastify/dist/ReactToastify.css";

const TopProgressBar = dynamic(() => import("../components/topLoadingBar"), {
  ssr: false,
});


function MyApp({ Component, pageProps }: AppProps): ReactElement {
  // const router = useRouter()
  // const urlComponent = router.route.split('/')
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}
export default MyApp;
