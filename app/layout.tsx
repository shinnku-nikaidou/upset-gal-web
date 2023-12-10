import type { Metadata } from 'next'
import { Providers } from '@/app/providers'

export const metadata: Metadata = {
  title: '失落小站 - galgame资源站',
  description: "shinnku's galgame site",
  icons: '/favicon.ico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='zh'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
