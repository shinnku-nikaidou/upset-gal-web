import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import t from '@lang'
import Home from '@components/legacy'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import Script from 'next/script'
import useBackGroundNode, {
  setBackgroundImage,
} from '@utils/persist/background'
import { useEffect, useRef, useState } from 'react'
import useGlobalTheme from '@/utils/persist/theme'

// now is Legacy Download Pages
const Download: NextPage = () => {
  const node = useRef<HTMLDivElement>(null)
  const url = useGlobalTheme((s) => s.url)
  const setNode = useBackGroundNode((s) => s.setNode)

  const [defaultInfo, setDefaultInfo] = useState<DefaultInfoProp>({
    isMobile: false,
    lang: 'en',
  })

  useEffect(() => {
    let language = navigator.language || 'en'
    language = language.substring(0, language.indexOf(',')) || language

    const isMobileView = navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
    )
    const isMobile = Boolean(isMobileView)

    setDefaultInfo({
      isMobile: isMobile,
      lang: language,
    })
  }, [])

  useEffect(() => {
    setNode(node.current)
    setBackgroundImage(url, defaultInfo.isMobile, node.current)
  })

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
        <title>{t('Title', defaultInfo.lang)}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content="shinnku's galgame site" />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <main className={styles.main}>
        <div className='box' ref={node}></div>
        <Home isMobile={defaultInfo.isMobile} lang={defaultInfo.lang} />
      </main>
    </div>
  )
}

export default Download
