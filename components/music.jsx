import React, { useEffect, useState } from 'react'
import { refreshmusic } from '@utils/music'
import axios from 'axios'
import Draggable from 'react-draggable'

export const musictheme = '#F57F17'

const Music = () => {
  const [beforeSSR, setBeforeSSR] = useState(false)
  const [audios, setAudios] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMini, _setIsMini] = useState(true)

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
    // autoplay: true,
    mini: isMini,
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      axios.get(`${origin}/api/music/v1/list`).then((res) => {
        const musics = res.data
        const audios = refreshmusic(musics)
        // console.log(audios)
        setAudios(audios)
        setBeforeSSR(true)
      })
    }
  }, [])

  return (
    <Draggable>
      <div
        style={{
          width: '75px',
          height: '75px',
          // background: 'lightgray',
          position: 'fixed',
          top: 'calc(90%)', // Let the initial position be lower in the middle of the page
          left: '0%',
          transform: 'translateX(-50%)', // This will center the element horizontally
          zIndex: 4,
        }}
      >
        {beforeSSR && (
          <ReactAplayer
            {...props}
            // onInit={onInit}
            onPlay={onPlay}
            onPause={onPause}
          />
        )}
      </div>
    </Draggable>

    // {/* <button onClick={() => this.ap.toggle()}>toggle</button> */}
  )
}

export default Music
