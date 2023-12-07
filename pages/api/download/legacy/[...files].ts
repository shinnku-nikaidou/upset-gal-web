import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import fileandfolder from '@ms-graph/fileandfolder'
import { OnedriveItemChildren } from '@/types/onedrive'
import config, { LEGACY_ONECRIVE_OAUTH } from '@/config'
import corsControl from '@utils/corsControl'
import { getAccount } from '@/utils/algorithms'
import url from 'url'

const users = config.LEGACY_ONECRIVE.map((user) => user.ONEDRIVE_NAME)
const filenotfound = "error, can't find this file"

interface FilesApiRequest extends NextApiRequest {
  query: {
    files: Array<string>
    cf?: string
  }
}

export default async function handler(
  req: FilesApiRequest,
  res: NextApiResponse<any>,
) {
  res = corsControl(req, res)
  const fullUrl = req.url
  console.log(fullUrl)

  try {
    const { cf } = req.query
    const files = req.query.files
    const user = getAccount()
    const i = users.indexOf(user)
    const lastfileorfolder = files[files.length - 1]
    files.pop()
    console.log(user)
    const childs = JSON.parse(
      await fs.readFile(
        path.join('data', 'legacy', user, 'root', ...files, 'child.json'),
        {
          encoding: 'utf8',
        },
      ),
    ) as OnedriveItemChildren

    const ans = await fileandfolder(
      LEGACY_ONECRIVE_OAUTH[i],
      childs,
      lastfileorfolder,
      [user, 'root', ...files],
      cf,
    )
    if (ans) {
      if (typeof ans === 'string') {
        if (ans == 'cf') {
          const pathname = fullUrl ? url.parse(fullUrl).pathname : ''
          res.redirect(302, config.SITE + `/human?redirect=${pathname}`)
        }
        res.redirect(302, ans)
      } else if (ans instanceof Response) {
        const headers = Object.fromEntries(ans.headers.entries())
        res.status(ans.status)
        for (const [key, value] of Object.entries(headers)) {
          res.setHeader(key, value)
        }
        const responseBody = await ans.text()
        res.send(responseBody)
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
