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
const { Content, Sider } = Layout

const Legacy = (props: DefaultInfoProp) => {
  const [collapsed, setCollapsed] = useState(props.isMobile)
  const urlPrefix = useMemo(() => getAccount(), [])
  const [key, setKey] = useState<TKey>(null)
  const [url, setUrl] = useState('')
  const [musicpos, setMusicpos] = useState('calc(70%)')

  const setMode = useGlobalTheme((state) => state.setMode)

  const onCollapse = useCallback(
    (collapsed: boolean) => setCollapsed(collapsed),
    [setCollapsed],
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMode(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      )

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          const newColorScheme = event.matches ? 'dark' : 'light'
          console.log(newColorScheme)
          setMode(newColorScheme)
        })
    }
  })

  useEffect(() => {
    console.log(key)
    if (key !== null && key !== '10') {
      setUrl(`api/download/${urlPrefix}/${keyMap[key]}`)
      setMusicpos('calc(90%)')
    } else {
      setMusicpos('calc(70%)')
    }
  }, [key, urlPrefix])

  return (
    <>
      <div
        style={{
          width: props.isMobile ? '300px' : '600px',
          height: '80px',
          // background: 'lightgray',
          position: 'fixed',
          top: musicpos, // Let the initial position be lower in the middle of the page
          left: '50%',
          transform: 'translateX(-50%)', // This will center the element horizontally
          zIndex: 4,
        }}
      >
        <Music />
      </div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          theme={useGlobalTheme((state) => state.mode)}
        >
          <SideMenu
            setKey={setKey}
            isMobile={props.isMobile}
            lang={props.lang}
          />
        </Sider>

        <Content style={{ margin: '0 16px' }}>
          <Logo isMobile={props.isMobile} lang={props.lang} />
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
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
