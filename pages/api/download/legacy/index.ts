import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import corsControl from '@utils/corsControl'
import { getAccount } from '@/utils/algorithms'

const usernotfound = "user doesn't exist or the config is still initializing"

interface UserApiRequest extends NextApiRequest {
  query: {
    user: string
  }
}

export default async function handler(
  req: UserApiRequest,
  res: NextApiResponse<any>,
) {
  // res = corsControl(req, res)

  let user = req.query.user
  if (user === 'legacy') {
    user = getAccount()
  }

  const jsonDirectory = path.join(
    process.cwd(),
    'data',
    'legacy',
    user,
    'root.json',
  )
  try {
    const fileContents = await fs.readFile(jsonDirectory, 'utf8')
    res.status(200).json(JSON.parse(fileContents))
  } catch {
    res.status(404).send(usernotfound)
  }
}
