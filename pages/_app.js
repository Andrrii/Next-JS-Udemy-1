import Head from 'next/head'
import Layout from '../components/layout/layout'
import NextNprogress from 'nextjs-progressbar'

import '../styles/globals.css'
import { NotificationContextProvider } from '../store/notification-context'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress 
          color = {"#29D"}
          startPosition = {0.3}
          stopDelayMs = {200}
          height = {4}
      />
      <NotificationContextProvider>
        <Layout>
            <Head>
              <meta name = "viewport" content = "width=device-width, initial-scale=1.0"/>
            </Head>
            <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </>
  )
}

export default MyApp
