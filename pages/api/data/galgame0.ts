import type { NextApiRequest, NextApiResponse } from 'next'

import { galgame0_bucket_files_json } from '@/config/root'


export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(galgame0_bucket_files_json)
}
