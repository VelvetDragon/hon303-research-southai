// pages/_app.js
import '../styles/globals.css'
import Layout from '../components/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  const isHomepage = router.pathname === '/';
  const applyPaperTexture = !isHomepage; 

  return (
    <div className={applyPaperTexture ? 'paper-texture-bg' : ''}>
      <Head>
        <title>Southern Research - AI Generated Southern Recipes</title>
        <meta name="description" content="Research on AI-generated Southern recipes and culinary traditions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout isHomepage={isHomepage}>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
