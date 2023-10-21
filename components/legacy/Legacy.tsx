import React, { useCallback, useEffect, useMemo, useState } from 'react'

import ThemeProviderMenu from './Theme'
import { getAccount } from '@algorithm'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import { Layout } from 'antd'
import { Readme } from './Readme'
import { keyMap } from '@const'
import { PageFooter } from './PageFooter'
import { SideMenu } from './SideMenu'
import { FileList } from './FileList'
import Logo from './Logo'
import useGlobalTheme from '@/utils/persist/theme'
import { TKey } from '@/types/onedrivelegacy'
import Music from '../music'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import Draggable from 'react-draggable'
const { Content, Sider } = Layout

const Legacy = (props: DefaultInfoProp) => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')

  const [collapsed, setCollapsed] = useState(props.isMobile)
  const urlPrefix = useMemo(() => getAccount(), [])
  const [key, setKey] = useState<TKey>(null)
  const [url, setUrl] = useState('')

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
      console.log(newColorScheme)
      setMode(newColorScheme)
      if (text == newColorScheme) {
        toggleMode()
      }

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          const newColorScheme = event.matches ? 'dark' : 'light'
          console.log(newColorScheme)
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
    }
  }, [key, urlPrefix])

  return (
    <>
      <Draggable>
        <div
          style={{
            width: '80px',
            height: '80px',
            // background: 'lightgray',
            position: 'fixed',
            top: 'calc(80%)', // Let the initial position be lower in the middle of the page
            left: '8%',
            transform: 'translateX(-50%)', // This will center the element horizontally
            zIndex: 4,
          }}
        >
          <Music />
        </div>
      </Draggable>
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
          <div
            className='site-layout-background'
            style={{ padding: props.isMobile ? 0 : 24, minHeight: 360 }}
          >
            {key !== null &&
              (key === '10' ? (
                <ThemeProviderMenu
                  isMobile={props.isMobile}
                  lang={props.lang}
                />
              ) : url !== '' ? (
                <FileList
                  url={url}
                  changeDirectory={(name: any) =>
                    setUrl(`api/download/${urlPrefix}/${keyMap[key]}/${name}`)
                  }
                  lang={props.lang}
                  isMobile={props.isMobile}
                />
              ) : (
                <></>
              ))}
            {key === null && (
              <Readme isMobile={props.isMobile} lang={props.lang} />
            )}
          </div>
        </Content>
      </Layout>
      <PageFooter lang={props.lang} />
    </>
  )
}

export default Legacy
