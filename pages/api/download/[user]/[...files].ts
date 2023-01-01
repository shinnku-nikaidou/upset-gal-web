import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { promises as fs } from 'fs'
import config, { get_oauth_drive, initConfig } from '../../../../config'
import fileandfolder from '../_fileandfolder'
import { DriveItemChildren } from '../../../../data/downloadtype'

const users = config.ONEDRIVE.map((user) => user.ONEDRIVE_NAME)
const filenotfound = "error, can't find this file"

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
        path.join('.config', user, 'root', ...initfile, 'child.json'),
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