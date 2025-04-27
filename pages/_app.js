// pages/_app.js
import '../styles/globals.css'
import Layout from '../components/Layout'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Southern Research - AI Generated Southern Recipes</title>
        <meta name="description" content="Research on AI-generated Southern recipes and culinary traditions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
