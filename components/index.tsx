import { Box, Center, CircularProgress, Img } from '@chakra-ui/react'
import Header from './header'
import Search from './search'

const App = (props: { isMobile: boolean; lang: string }) => {
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
      <Box minH={"80px"} />

      <Center>
        <Box>
          <iframe
            width='640'
            height='360'
            src='http://111.89.135.99/downloads/ustrack/webadv/webadv.html'
            title='恋×シンアイ彼女'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </Box>
      </Center>
    </>
  )
}

export default App
