import type { AppProps } from 'next/app'
import { StyleProvider as AntdProvider } from '@ant-design/cssinjs'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'
import '../public/antd.min.css'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AntdProvider hashPriority='low'>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </AntdProvider>
)

export default MyApp
