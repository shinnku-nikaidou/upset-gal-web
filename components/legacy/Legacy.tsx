import React, { useCallback, useEffect, useState } from 'react'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import { Layout } from 'antd'
import { keyMap } from '@const'
import { PageFooter } from './PageFooter'
import { SideMenu } from './SideMenu'
import Logo from './Logo'
import useGlobalTheme from '@/utils/persist/theme'
import Music from '../music'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import LegacyContent, { useFileListStore } from './LegacyContent'
const { Content, Sider } = Layout

const Legacy = (props: DefaultInfoProp) => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const [collapsed, setCollapsed] = useState(props.isMobile)
  const { key, setKey, urlPrefix, setUrl, setPage } = useFileListStore()

  const siderShift = collapsed ? 80 : 200

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
      setUrl(`api/download/${urlPrefix}/${keyMap[key]}`)
      setPage(1)
    }
  }, [key, setPage, setUrl, urlPrefix])

  return (
    <>
      <Music />
      <Sider
        // collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        theme={useGlobalTheme((state) => state.mode)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <SideMenu setKey={setKey} isMobile={props.isMobile} lang={props.lang} />
      </Sider>
      <Layout
        className='site-layout'
        style={{ marginLeft: siderShift, minHeight: '100vh' }}
      >
        <Content style={{ margin: '0 16px' }}>
          <Logo isMobile={props.isMobile} lang={props.lang} />
          <LegacyContent isMobile={props.isMobile} lang={props.lang} />
        </Content>
        <PageFooter lang={props.lang} />
      </Layout>
    </>
  )
}

export default Legacy
