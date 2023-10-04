import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import config, { get_oauth_drive, initConfig } from '@ms-graph/initconfig'
import fileandfolder from '@ms-graph/fileandfolder'
import { DriveItemChildren } from '@/types/downloadtype'

const users = config.ONEDRIVE.map((user) => user.ONEDRIVE_NAME)
const filenotfound = "error, can't find this file"

const rewriteUrl = (url: string, proxy: string | undefined) => {
  if (typeof proxy === 'undefined') {
    return url
  }

  if (proxy.endsWith('/')) {
    proxy = proxy.slice(0, -1)
  }

  return url.replace(/https:\/\/\w+\.sharepoint\.com/, proxy)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { user, files } = req.query as { user: string; files: string[] }
    initConfig()
    const i = users.indexOf(user)
    const lastfile = files[files.length - 1]
    files.pop()
    const initfile = files
    console.log(lastfile, initfile, user)
    const childs = JSON.parse(
      await fs.readFile(
        path.join('data', 'legacy', user, 'root', ...initfile, 'child.json'),
        {
          encoding: 'utf8',
        },
      ),
    ) as DriveItemChildren

    const ans = await fileandfolder(get_oauth_drive(i), childs, lastfile, [
      user,
      'root',
      ...initfile,
    ])
    if (ans) {
      if (typeof ans === 'string') {
        res.redirect(302, rewriteUrl(ans, config.REVERSE_PROXY))
      } else {
        res.send(ans)
      }
    } else {
      res.send(filenotfound)
    }
  } catch (e) {
    res.status(500).send(e)
  }
}
