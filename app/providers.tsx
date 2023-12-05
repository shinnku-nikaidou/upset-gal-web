'use client'

import { StyleProvider as AntdProvider } from '@ant-design/cssinjs'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdProvider hashPriority='low'>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </AntdProvider>
  )
}
