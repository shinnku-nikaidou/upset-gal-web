import type { NextApiRequest, NextApiResponse } from 'next'

const ALLOWED_ORIGINS = ['shinnku.com', 'shinnku.us', 'shinku.life']

export default function corsControl(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const origin = req.headers.origin!

  ALLOWED_ORIGINS.forEach((allowed_origin) => {
    if (allowed_origin.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      return res
    }
  })

  return res
}
