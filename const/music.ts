import { join } from 'path'
import fs from 'fs'

export const MUSIC_DIR_V1 = join(process.cwd(), 'data', 'music', 'v1')

export const MUSIC_FILES_V1 = fs
  .readdirSync(MUSIC_DIR_V1)
  .filter((file) => file.endsWith('.mp3') || file.endsWith('.flac'))

export const musicbase = 'data/music/v1/'
export const coverbase = 'data/music/v1/cover/'
export const lyricbase = 'data/music/v1/lyc/'
