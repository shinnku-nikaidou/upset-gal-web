import Logo from '@/components/Logo'
import { Readme } from '@/components/Readme'
import { Box, Flex } from '@chakra-ui/react'

export default function Home() {
  return (
    <div>
      <Flex direction='column'>
        <Box w='full' h='15vh'>
          <Logo />
        </Box>
        <Flex flex='1'>
          <Box w={'240px'} paddingLeft={1}>
            {/* <SideMenu /> */}
          </Box>
          <Box flex='1' overflowY='scroll'>
            <Readme />
          </Box>
        </Flex>
        {/* <PageFooter lang={props.lang} /> */}
      </Flex>
    </div>
  )
}
