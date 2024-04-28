import { checkversion } from '@const'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import React from 'react'
import Legacy from './Legacy'
const Home = (props: DefaultInfoProp) => {
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
