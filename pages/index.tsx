import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import t from '@lang'
import Home from '@components/legacy'
// import DefaultInfoProp from '@utils/userDefaultInfoProp'
// import DefaultInfoProp, {
//   userDefaultInfoProp,
// } from '@utils/userDefaultInfoProp'
import Script from 'next/script'
import useBackGroundNode, {
  setBackgroundImage,
} from '@utils/persist/background'
import { useEffect, useRef, useState } from 'react'
import useGlobalTheme from '@/utils/persist/theme'

const Download: NextPage = () => {
  const lang = 'en'
  const [isMobile, setIsMobile] = useState(true)
  const node = useRef<HTMLDivElement>(null)
  const url = useGlobalTheme((s) => s.url)
  const setNode = useBackGroundNode((s) => s.setNode)

  useEffect(() => {
    setNode(node.current)
    setBackgroundImage(url, isMobile, node.current)
  })

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent
    const isMobileView = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
      ),
    )
    setIsMobile(isMobileView)
  }, [])

  return (
    <div className={styles.container}>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-61P3NL510C'
      ></Script>
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-61P3NL510C');
        `}
      </Script>
      <Script
        defer
        src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "65325546c71740a78ecc6e8fa7815010"}'
      ></Script>
      <Head>
        <meta charSet='UTF-8' />
        <title>{t('Title', lang)}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content="shinnku's galgame site" />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <main className={styles.main}>
        <div className='box' ref={node}></div>
        <Home isMobile={isMobile} lang={lang} />
      </main>
    </div>
  )
}

// Download.getInitialProps = userDefaultInfoProp

export default Download
