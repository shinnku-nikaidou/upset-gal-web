import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { Layout, ConfigProvider } from 'antd'
import { DirectionType } from 'antd/es/config-provider'
import { checkversion, keyMap } from '../../data/consts'
import { Mode, TKey } from '../../data/interfaces'
import { SideMenu, FileList, Readme, PageFooter } from '.'

import { getAccount } from '../../utils'

import ThemeProviderMenu, { useGlobalTheme } from './Theme'
import theme from 'antd/lib/theme'

const { Content, Sider } = Layout

const Main = (props: { isMobile: boolean; lang: string }) => {
  const [collapsed, setCollapsed] = useState(props.isMobile)
  const urlPrefix = useMemo(() => getAccount(), [])
  const [key, setKey] = useState<TKey>(null)
  const [url, setUrl] = useState('')

  useLayoutEffect(() => {
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
    if (key !== null && key !== '10')
      setUrl(`api/download/${urlPrefix}/${keyMap[key]}`)
  }, [key, urlPrefix])

  const setMode = useGlobalTheme((s) => s.changeMode)

  const onCollapse = useCallback(
    (collapsed: boolean) => setCollapsed(collapsed),
    [setCollapsed],
  )

  return (
    <React.StrictMode>
      <ConfigProvider
        direction={useGlobalTheme((state) => state.direction) as DirectionType}
        theme={{
          algorithm:
            useGlobalTheme((state) => state.mode) === 'light'
              ? theme.defaultAlgorithm
              : theme.darkAlgorithm,
        }}
      >
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            theme={useGlobalTheme((state) => state.mode as Mode)}
          >
            <SideMenu
              setKey={setKey}
              isMobile={props.isMobile}
              lang={props.lang}
            />
          </Sider>

          <Content style={{ margin: '0 16px' }}>
            <div
              className='site-layout-background'
              style={{ padding: 24, minHeight: 360 }}
            >
              {key !== null &&
                (key === '10' ? (
                  <ThemeProviderMenu />
                ) : url !== '' ? (
                  <FileList
                    url={url}
                    changeDirectory={(name) =>
                      setUrl(`api/download/${urlPrefix}/${keyMap[key]}/${name}`)
                    }
                    lang={props.lang}
                  />
                ) : (
                  <></>
                ))}
              {key === null && <Readme lang={props.lang} />}
            </div>
          </Content>
        </Layout>
        <PageFooter lang={props.lang} />
      </ConfigProvider>
    </React.StrictMode>
  )
}

export default Main

const config_init = async () => {
  console.log('Hello world')
  if (typeof window === 'object') {
    ConfigProvider.config({
      theme: {
        primaryColor: '#25b864',
      },
    })
    checkversion()
  }
}

config_init()

export { config_init }
