import type { NextApiRequest, NextApiResponse } from 'next'

import { search_index } from '@/config/root'
import { cn2jp, removeDuplicateCharacters, runsearch } from '@/algorithm/search'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { q } = req.query as { q: string }

  const queryjp = cn2jp(q)
  const query = removeDuplicateCharacters(q + queryjp)

  const results = runsearch(query, search_index).slice(0, 20)

  res.status(200).send(results)
}
