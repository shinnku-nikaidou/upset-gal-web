import type { NextApiRequest, NextApiResponse } from 'next'

import { galgame0_tree } from '@/config/root'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(galgame0_tree)
}
