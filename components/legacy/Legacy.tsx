import React, { useEffect } from 'react'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import { keyMap } from '@const'
import { PageFooter } from './PageFooter'
import { SideMenu } from './SideMenu'
import Logo from './Logo'
import useGlobalTheme from '@/utils/persist/theme'
import { Box, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react'
import LegacyContent, { useFileListStore } from './LegacyContent'

const Legacy = (props: DefaultInfoProp) => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const { key, setKey, setUrl, setPage } = useFileListStore()

  const setMode = useGlobalTheme((state) => state.setMode)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      setMode(newColorScheme)
      if (text == newColorScheme) {
        toggleMode()
      }

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          const newColorScheme = event.matches ? 'dark' : 'light'
          setMode(newColorScheme)
          if (text == newColorScheme) {
            toggleMode()
          }
        })
    }
  })

  useEffect(() => {
    console.log(key)
    if (key !== null && key !== '10') {
      setUrl(`api/download/legacy/${keyMap[key]}`)
      setPage(1)
    }
  }, [key, setPage, setUrl])

  return (
    <>
      {/* <Music /> */}
      <Flex direction='column'>
        <Box w='full' h='15vh'>
          <Logo isMobile={props.isMobile} lang={props.lang} />
        </Box>
        <Flex flex='1'>
          <Box w={props.isMobile ? '50px' : '240px'} paddingLeft={1}>
            <SideMenu
              setKey={setKey}
              isMobile={props.isMobile}
              lang={props.lang}
            />
          </Box>
          <Box flex='1' overflowY='scroll'>
            <LegacyContent isMobile={props.isMobile} lang={props.lang} />
          </Box>
        </Flex>
        <PageFooter lang={props.lang} />
      </Flex>
    </>
  )
}

export default Legacy
