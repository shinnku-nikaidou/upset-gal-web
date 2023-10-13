import { ConfigProvider, theme } from 'antd'
import { DirectionType } from 'antd/es/config-provider'
import { checkversion } from '@const'
import DefaultInfoProp from '@/utils/userDefaultInfoProp'
import React from 'react'
import { useGlobalTheme } from './Theme'
import Legacy from './Legacy'

const Home = (props: DefaultInfoProp) => (
  <React.StrictMode>
    <ConfigProvider
      direction={useGlobalTheme((state) => state.direction) as DirectionType}
      theme={{
        algorithm:
          useGlobalTheme((state) => state.mode) === 'light'
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
        token: {
          // fontSize: 16,
          colorPrimary: '#52c41a',
          colorLink: '#52c41a',
          // just for fun, next 4 lines
          // colorPrimary: '#EC0D0D',
          // colorLink: '#EC0D0D',
          // colorTextBase: '#EC0D0D',
          // colorBgBase: '#2B0DEC',
        },
      }}
    >
      <Legacy isMobile={props.isMobile} lang={props.lang} />
    </ConfigProvider>
  </React.StrictMode>
)

export default Home

const config_init = async () => {
  checkversion()
}

config_init()

export { config_init }
