import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import t from '@lang'
import Home from '@components/legacy'
import DefaultInfoProp, {
  userDefaultInfoProp,
} from '@utils/userDefaultInfoProp'
import Script from 'next/script'
import useBackGroundNode, {
  setBackgroundImage,
} from '@utils/persist/background'
import { useEffect, useRef } from 'react'
import useGlobalTheme from '@/utils/persist/theme'

// now is Legacy Download Pages
const Download: NextPage<DefaultInfoProp> = ({ isMobile, lang }) => {
  const node = useRef<HTMLDivElement>(null)
  const url = useGlobalTheme((s) => s.url)
  const setNode = useBackGroundNode((s) => s.setNode)

  useEffect(() => {
    setNode(node.current)
    setBackgroundImage(url, isMobile, node.current)
  })

  return (
    <div className={styles.container}>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-PG2D8XX3XC'
      ></Script>
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PG2D8XX3XC');
        `}
      </Script>
      <Head>
        <meta charSet='UTF-8' />
        <title>{t('Title', lang)}</title>
        <link rel='icon' type='image/svg+xml' href='/favicon.ico' />
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

Download.getInitialProps = userDefaultInfoProp

export default Download
