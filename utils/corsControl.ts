import type { NextApiRequest, NextApiResponse } from 'next'
import { formattedTimeStamp } from './log/timeStamp'

const ALLOWED_ORIGINS = ['shinnku.com', 'shinnku.us', 'shinku.life']

export default function corsControl(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const host = req.headers.host!
  console.log(formattedTimeStamp(), host)

  ALLOWED_ORIGINS.forEach((allowed_origin) => {
    if (allowed_origin.includes(host)) {
      const origin = 'https://' + host
      res.setHeader('Access-Control-Allow-Origin', origin)
      return res
    }
  })

  return res
}
