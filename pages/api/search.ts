import type { NextApiRequest, NextApiResponse } from 'next'

import { default_search } from '@/algorithm/search'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { q } = req.query as { q: string }

  const results = default_search(q, 100)

  res.status(200).send(results)
}
