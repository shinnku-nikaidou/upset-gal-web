import { join } from 'path'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { MUSIC_DIR_V1, MUSIC_FILES_V1 } from '@const/music'

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { music },
  } = req

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  let music0 = ''

  if (!music) {
    res.status(400).end('Parameter `music` is required')
    return
  } else if (Array.isArray(music)) {
    music0 = music[0]
  } else if (music) {
    music0 = music
  }

  if (!MUSIC_FILES_V1.includes(music0)) {
    res.status(404).end('File not found')
    return
  }

  const musicPath = join(MUSIC_DIR_V1, music0)

  res.setHeader('Content-Type', 'audio/mpeg')
  fs.createReadStream(musicPath).pipe(res)
}
