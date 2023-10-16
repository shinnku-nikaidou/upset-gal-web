import React, { useEffect, useState } from 'react'

export const musictheme = '#F57F17'

const Music = () => {
  const [beforeSSR, setBeforeSSR] = useState(false)
  const [origin, setOrigin] = useState('')

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
    audio: [
      {
        name: 'Musa',
        artist: 'Active Planets',
        url: `${origin}/api/music/v1?music=Active Planets - Musa.mp3`,
        cover: `${origin}/api/music/v1/cover?cover=Active Planets - Musa.jpg`,
        // lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
        theme: '#ebd0c2',
      },
    ],
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBeforeSSR(true)
      setOrigin(window.location.origin)
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
