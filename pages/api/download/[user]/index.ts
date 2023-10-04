import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'

const usernotfound = "user doesn't exist or the config is still initializing"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { user } = req.query
  const users = user as string
  const jsonDirectory = path.join(
    process.cwd(),
    'data',
    'legacy',
    users,
    'root.json',
  )
  try {
    const fileContents = await fs.readFile(jsonDirectory, 'utf8')
    res.status(200).json(JSON.parse(fileContents))
  } catch {
    res.status(404).send(usernotfound)
  }
}
