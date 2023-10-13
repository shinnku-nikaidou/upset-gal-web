import { ConfigProvider, theme } from 'antd'
import { checkversion } from '@const'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import React from 'react'
import Legacy from './Legacy'
import useGlobalTheme from '@utils/persist/theme'

const Home = (props: DefaultInfoProp) => {
  const direction = useGlobalTheme((state) => state.direction)
  const mode = useGlobalTheme((state) => state.mode)
  const colorPrimary = useGlobalTheme((state) => state.color)

  return (
    <React.StrictMode>
      <ConfigProvider
        direction={direction}
        theme={{
          algorithm:
            mode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
          token: {
            fontSize: 14,
            colorPrimary: colorPrimary,
            colorLink: colorPrimary,
            // just for fun, next 3 lines
            // colorPrimary: '#EC0D0D',
            // colorTextBase: '#EC0D0D',
            // colorBgBase: '#2B0DEC',
          },
        }}
      >
        <Legacy isMobile={props.isMobile} lang={props.lang} />
      </ConfigProvider>
    </React.StrictMode>
  )
}

export default Home

const config_init = async () => {
  checkversion()
}

config_init()

export { config_init }
