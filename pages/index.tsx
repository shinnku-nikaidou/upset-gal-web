import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import t from '../utils/languages'
import Main from '../components/download/Main'
import { addDefaultProp } from '../utils/addDefaultProp'
import Script from 'next/script'

const Download: NextPage = (props: Record<string, never>) => {
  const language: string = (props as any).language
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
        <title>{t('Title', language)}</title>
        <link rel='icon' type='image/svg+xml' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content="shinnku's galgame site" />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <main className={styles.main}>
        <Main isMobile={(props as any).isMobile} lang={language} />
      </main>
    </div>
  )
}

Download.getInitialProps = addDefaultProp

export default Download
