import React, { useEffect, useState } from 'react'

const Music = () => {
  const [beforeSSR, setBeforeSSR] = useState(false)

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
    theme: '#F57F17',
    // lrcType: 3,
    audio: [
      {
        name: '散花',
        artist: '水月陵',
        url: 'https://xxxxxxx/api/music/v1?music=水月陵 - 散花.flac',
        // cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
        // lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
        theme: '#ebd0c2',
      },
    ],
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBeforeSSR(true)
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
