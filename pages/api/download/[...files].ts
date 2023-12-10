import { NextApiRequest, NextApiResponse } from 'next'
import { account } from '@/config'
import corsControl from '@utils/corsControl'
import root from '@utils/drive'
import { DriveItem } from '@/types'
import { showfiles } from '@/utils/algorithms/showfile'
import query_one from '@/utils/ms-graph/query'
import { OneriveItem } from '@/types/onedrive'

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

  if (item['@type'] === 'folder') {
    res.send(showfiles(item))
  } else {
    const accountID = item.sources[0].accountid
    const id = item.sources[0].item.id
    const a = account.find((a) => a.accountID === accountID)!
    const body = (await query_one(a.oauth, id, '')) as OneriveItem
    res.redirect(302, body['@microsoft.graph.downloadUrl']!)
  }
}
