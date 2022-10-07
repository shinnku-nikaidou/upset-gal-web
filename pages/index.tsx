import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Main } from '../src/main'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="shinnku's galgame site" />
          <link rel="manifest" href="/manifest.json" />
        </head>

        <body>
          <div id="bgi" className="box"></div>
          <Main></Main>
        </body>
      </html></>

  )
}

export default Home
