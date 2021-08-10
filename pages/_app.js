import Layout from '../components/layout/layout'
import NextNprogress from 'nextjs-progressbar'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress 
          color = {"#29D"}
          startPosition = {0.3}
          stopDelayMs = {200}
          height = {4}
      />
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
