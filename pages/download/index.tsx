import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { Main } from './_main'

const Download: NextPage = (props: {}) => {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{"galgame 资源分享"}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="shinnku's galgame site" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <main className={styles.main}>
        <Main isMobile={(props as any).isMobile} />
      </main>

    </div>
  )
}

Download.getInitialProps = async (ctx) => {
  const isMobileView = ((ctx.req
    ? ctx.req.headers['user-agent']
    : navigator.userAgent) as string).match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )

  //Returning the isMobileView as a prop to the component for further use.
  const isMobile = Boolean(isMobileView)
  console.log(`isMobile is ${isMobile}`)
  return {
    isMobile: isMobile
  }
}

export default Download
