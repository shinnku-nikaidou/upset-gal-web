import type { NextApiRequest, NextApiResponse } from 'next'

import { shinnku_tree } from '@/config/root'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(shinnku_tree)
}
