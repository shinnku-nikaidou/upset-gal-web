import {
  Box,
  Center,
  CircularProgress,
  Img,
} from '@chakra-ui/react'
import Header from './header'
import Search from './search'

const App = (props: { isMobile: boolean, lang: string }) => {
  return (
    <>
      <Header />
      <Box h='80px' />
      <Center>
        <Img
          height='160px'
          objectFit='cover'
          src='/assets/upsetgal-logo.png'
          alt='upset visual novel logo'
        />
      </Center>
      <Search isMobile={props.isMobile} lang={props.lang} />
      <Box minH={120}/>

      <Center>
        <Box>
          <CircularProgress isIndeterminate color='green.300' />
        </Box>
      </Center>
    </>
  )
}

export default App
