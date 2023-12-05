import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import fileandfolder from '@ms-graph/fileandfolder'
import { DriveItemChildren } from '@/types/downloadtype'
import config, { LEGACY_ONECRIVE_OAUTH, LEGACY_ONECRIVE } from '@/config'
import corsControl from '@utils/corsControl'
import { getAccount } from '@/utils/algorithms'
import url from 'url'

const users = LEGACY_ONECRIVE.map((user) => user.ONEDRIVE_NAME)
const filenotfound = "error, can't find this file"

interface FilesApiRequest extends NextApiRequest {
  query: {
    user: string
    files: Array<string>
    cf?: string
  }
}

export default async function handler(
  req: FilesApiRequest,
  res: NextApiResponse<any>,
) {
  res = corsControl(req, res)

  try {
    const { cf } = req.query
    const files = req.query.files
    let user = req.query.user
    if (user === 'legacy') {
      user = getAccount()
    }
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

    const ans = await fileandfolder(
      LEGACY_ONECRIVE_OAUTH[i],
      childs,
      lastfile,
      [user, 'root', ...initfile],
      cf,
    )
    if (ans) {
      if (typeof ans === 'string') {
        if (ans == 'cf') {
          const fullUrl = req.url
          const pathname = fullUrl ? url.parse(fullUrl).pathname : ''
          res.redirect(302, config.SITE + `/human?redirect=${pathname}`)
        }
        res.redirect(302, ans)
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
