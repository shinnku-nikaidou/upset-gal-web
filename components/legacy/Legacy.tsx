import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { Mode, TKey } from '@/types/theme'

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
import useGlobalTheme from '@utils/persist/theme'

const { Content, Sider } = Layout

const Legacy = (props: DefaultInfoProp) => {
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
    <>
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
          <Logo isMobile={props.isMobile} lang={props.lang} />
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
                  changeDirectory={(name: any) =>
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
    </>
  )
}

export default Legacy
