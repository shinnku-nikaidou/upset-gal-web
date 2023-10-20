import { Audio } from '@/types'
import { shuffleArray } from './algorithms'
import _ from 'lodash'

export function name2audio(file: string, origin: string): Audio {
  let name
  if (file.endsWith('.mp3')) {
    name = file.substring(0, file.length - 4)
  } else if (file.endsWith('.flac')) {
    name = file.substring(0, file.length - 5)
  } else {
    name = ''
  }
  const index = name.indexOf('-')

  if (index !== -1) {
    const artist = name.substring(0, index).trim()
    const musicname = name.substring(index + 1).trim()
    // console.log({ artist, musicname })
    // { artist: '40mP,初音ミク', musicname: 'からくりピエロ' }
    return {
      artist: artist,
      name: musicname,
      url: `https://r2.shinnku.com/v1/${file}`,
      cover: `https://r2.shinnku.com/cover/${name}.jpg`,
      theme: '#ebd0c2',
    }
  } else {
    console.error('Dash (-) not found in the input.')
    return {
      name: name,
      url: `${origin}/api/music/v1?music=${file}`,
      cover: `${origin}/api/music/v1/cover?cover=${name}.jpg`,
      theme: '#ebd0c2',
    }
  }
}

export function refreshmusic(musics: string[], origin: string) {
  const files = _.cloneDeep(musics)
  shuffleArray(files)
  const audios = files.map((file) => name2audio(file, origin))
  return audios
}
