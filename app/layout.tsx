import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { Link } from '@heroui/link'
import clsx from 'clsx'
import Script from 'next/script'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head>
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-61P3NL510C'
        />
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
          data-cf-beacon='{"token": "65325546c71740a78ecc6e8fa7815010"}'
          src='https://static.cloudflareinsights.com/beacon.min.js'
        />
      </head>
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div
          className="box bg-[url('/assets/GT5Bjdba4AAbCkU.jpeg')] md:bg-[url('/assets/81320307_p0.jpg')]"
          id='box-main'
        />
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className='relative flex flex-col h-screen'>
            <Navbar />
            <main className='container mx-auto max-w-8xl pt-16 px-6 flex-grow'>
              {children}
            </main>
            <footer className='w-full flex items-center justify-center py-3'>
              <Link
                isExternal
                className='flex items-center gap-1 text-current'
                href='https://t.me/upsetgal'
                title='join telegram'
              >
                <span className='text-default-600'>Powered by</span>
                <p className='text-primary'>Shinnku; </p>
                <span className='text-default-600'>join our telegram</span>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
