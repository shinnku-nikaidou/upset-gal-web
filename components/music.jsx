import React, { useEffect, useState } from 'react'
import { refreshmusic } from '@utils/music'
import axios from 'axios'

export const musictheme = '#F57F17'

const Music = () => {
  const [beforeSSR, setBeforeSSR] = useState(false)
  const [audios, setAudios] = useState([])

  let ReactAplayer

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ReactAplayer = require('react-aplayer').default
  }

  // event binding example
  const onPlay = () => {
    console.log('on play')
  }

  const onPause = () => {
    console.log('on pause')
  }

  const props = {
    theme: musictheme,
    // lrcType: 3,
    audio: audios,
    listFolded: true,
    autoplay: true,
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      axios.get(`${origin}/api/music/v1/list`).then((res) => {
        const musics = res.data
        const audios = refreshmusic(musics, origin)
        // console.log(audios)
        setAudios(audios)
        setBeforeSSR(true)
      })
    }
  }, [])

  return (
    <div>
      {beforeSSR && (
        <ReactAplayer
          {...props}
          // onInit={onInit}
          onPlay={onPlay}
          onPause={onPause}
        />
      )}
      {/* <button onClick={() => this.ap.toggle()}>toggle</button> */}
    </div>
  )
}

export default Music
