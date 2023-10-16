import { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs-extra'
import path from 'path'
import { MUSIC_DIR_V1 } from '@const/music'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cover } = req.query

  if (typeof cover !== 'string') {
    res.status(400).send('Invalid parameter.')
    return
  }

  try {
    const jpgData = await fs.readFile(path.join(MUSIC_DIR_V1, 'cover', cover))

    res.setHeader('Content-Type', 'image/jpeg')
    // res.setHeader('Content-Disposition', `attachment; filename=${cover}`)
    res.send(jpgData)
  } catch (error) {
    res.status(404).send('Cover not found.')
  }
}
