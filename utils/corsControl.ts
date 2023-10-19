import type { NextApiRequest, NextApiResponse } from 'next'
import { formattedTimeStamp } from './log/timeStamp'

const ALLOWED_ORIGINS = [
  'shinnku.com',
  'shinnku.us',
  'shinku.life',
  'localhost',
  '127.0.0.1',
  'shinnku.plr.moe'
]

export function extractOrigin(referer: string) {
  try {
    const url = new URL(referer);
    return url.origin;
  } catch (e) {
    console.error(e);
    return ''
  }
}

export default function corsControl(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const referer = req.headers.referer!
  console.log(formattedTimeStamp(), referer)

  ALLOWED_ORIGINS.forEach((allowed_origin) => {
    if (referer && referer.includes(allowed_origin)) {
      const origin = extractOrigin(referer)
      res.setHeader('Access-Control-Allow-Origin', origin)
      return res
    }
  })

  return res
}
