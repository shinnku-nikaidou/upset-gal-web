import { MUSIC_FILES_V1 } from '@const/music'

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  res.status(200).json(MUSIC_FILES_V1)
}
