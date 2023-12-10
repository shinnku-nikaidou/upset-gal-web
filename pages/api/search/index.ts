import { files } from '@/utils/drive'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { q } = req.query as { q: string }
  if (q === 'files') {
    res.send(files)
  }

  res.status(200).send(files.slice(0, 15))
}
