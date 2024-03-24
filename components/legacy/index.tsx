import { checkversion } from '@const'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import React, { useEffect, useState } from 'react'
import Legacy from './Legacy'
import useGlobalTheme from '@utils/persist/theme'
import { defaultGreenColor } from '@const/theme'
import { Mode } from '@/types/theme'

const Home = (props: DefaultInfoProp) => {
  const color = useGlobalTheme((state) => state.color)
  const mode = useGlobalTheme((state) => state.mode)

  const [initcolor, setColor] = useState(defaultGreenColor)
  const [initmode, setMode] = useState<Mode>('light')

  useEffect(() => {
    setColor(color)
    setMode(mode)
  }, [color, mode])

  return (
    <React.StrictMode>
      <Legacy isMobile={props.isMobile} lang={props.lang} />
    </React.StrictMode>
  )
}

export default Home

const config_init = async () => {
  checkversion()
}

config_init()

export { config_init }
