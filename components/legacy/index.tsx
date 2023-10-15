import { ConfigProvider, theme } from 'antd'
import { checkversion } from '@const'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import React, { useEffect, useState } from 'react'
import Legacy from './Legacy'
import useGlobalTheme from '@utils/persist/theme'
import { defaultGreenColor } from '@const/theme'
import { DirectionType } from 'antd/lib/config-provider'
import { Mode } from '@/types/theme'

const Home = (props: DefaultInfoProp) => {
  const direction = useGlobalTheme((state) => state.direction)
  const color = useGlobalTheme((state) => state.color)
  const mode = useGlobalTheme((state) => state.mode)

  const [initcolor, setColor] = useState(defaultGreenColor)
  const [initdirection, setDirection] = useState<DirectionType>('ltr')
  const [initmode, setMode] = useState<Mode>('light')

  useEffect(() => {
    setColor(color)
    setDirection(direction)
    setMode(mode)
  }, [color, direction, mode])

  return (
    <React.StrictMode>
      <ConfigProvider
        direction={initdirection}
        theme={{
          algorithm:
            initmode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
          token: {
            // fontSize: 14,
            colorPrimary: initcolor,
            colorLink: initcolor,
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
