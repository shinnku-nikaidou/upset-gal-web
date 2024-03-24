import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { NextUIProvider } from '@nextui-org/react'
import '../styles/globals.css'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  </ChakraProvider>
)

export default MyApp
