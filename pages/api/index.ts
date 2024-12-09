// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  data: string
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res
    .status(200)
    .json({
      name: 'shinnku',
      data: 'hello, my old dear friend, the server is successful running',
    })
}
