import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import wikisearch from './wikipedia'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { q } = req.query as { q: string }
  const ans = await wikisearch(q)
  console.log(ans)
  res.status(200).json(ans)
}
