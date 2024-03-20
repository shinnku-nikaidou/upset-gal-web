import React, { useCallback, useEffect, useState } from 'react'
import DefaultInfoProp, {
  userDefaultInfoProp,
} from '@utils/userDefaultInfoProp'
import { Layout } from 'antd/lib'
import { keyMap } from '@const'
import { PageFooter } from './PageFooter'
import { SideMenu } from './SideMenu'
import Logo from './Logo'
import useGlobalTheme from '@/utils/persist/theme'
import Music from '../music'
import { Box, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react'
import LegacyContent, { useFileListStore } from './LegacyContent'
const { Sider } = Layout

const Legacy = (props: DefaultInfoProp) => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const [collapsed, setCollapsed] = useState(props.isMobile)
  const { key, setKey, setUrl, setPage } = useFileListStore()

  const setMode = useGlobalTheme((state) => state.setMode)

  const onCollapse = useCallback(
    (collapsed: boolean) => setCollapsed(collapsed),
    [setCollapsed],
  )

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
        <Flex flex='1' overflow='hidden'>
          <Box w={props.isMobile ? '40px' : '240px'} h='100vh'>
            <SideMenu
              setKey={setKey}
              isMobile={props.isMobile}
              lang={props.lang}
            />
          </Box>
          <Box overflowY='auto'>
            <LegacyContent isMobile={props.isMobile} lang={props.lang} />
          </Box>
        </Flex>
        <Box bg='blue.500' w='full'>
          <PageFooter lang={props.lang} />
        </Box>
      </Flex>
    </>
  )
}

export default Legacy
