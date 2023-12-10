import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import config from '@/config'
import corsControl from '@utils/corsControl'
import url from 'url'
import root from '@utils/drive'
import { DriveItem } from '@/types'

const users = config.LEGACY_ONECRIVE.map((user) => user.ONEDRIVE_NAME)
const wrong =
  "Something goes wrong, But it's not your fault, please report to \u771f\u7ea2."

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
  const files = req.query.files
  console.log(files)
  let item: DriveItem = root
  for (const file of files) {
    if (item['@type'] == 'file') {
      res.send(wrong)
    } else {
      const found: DriveItem | undefined = item.childrens.find(
        (c) => c.name === file,
      )
      if (!found) {
        res.send(wrong)
      } else {
        item = found
      }
    }
  }

  res.send({ a: '真红' })
}
