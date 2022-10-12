import { CircularProgress, Text } from '@chakra-ui/react'
import Link from 'next/link'
import t from './languages'

const App = (props: { lang: string }) => {
  return (
    <>
      <CircularProgress isIndeterminate color='green.300' />

      <Text fontSize='2xl'>
        Welcome to <Link href='/download'>shinnku.com!</Link>
      </Text>
    </>
  )
}

export default App
