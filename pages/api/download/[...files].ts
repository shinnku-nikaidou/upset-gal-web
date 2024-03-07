import { NextApiRequest, NextApiResponse } from 'next'
import config, { account } from '@/config'
import url from 'url'
import corsControl from '@utils/corsControl'
import root from '@utils/drive'
import { DriveItem } from '@/types'
import { showfiles } from '@/utils/algorithms/showfile'
import query_one from '@/utils/ms-graph/query'
import { OneriveItem } from '@/types/onedrive'
import { cfVerifyEndpoint } from '@/const'

const wrong =
  "Something goes wrong, But it's not your fault, please report to shinnku."

const secret = config.CLOUDFLARE.Turnstile.SecretKey

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
  const { cf } = req.query

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
    if (!cf) {
      const pathname = fullUrl ? url.parse(fullUrl).pathname : ''
      res.redirect(302, config.SITE + `/human?redirect=${pathname}`)
    } else {
      const cfres = await fetch(cfVerifyEndpoint, {
        method: 'POST',
        body: `secret=${encodeURIComponent(
          secret,
        )}&response=${encodeURIComponent(cf)}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })

      const data = await cfres.json()

      if (!data.success) {
        res.status(400).send(data)
      }

      const accountID = item.sources[0].accountid
      const id = item.sources[0].item.id
      const a = account.find((a) => a.accountID === accountID)!
      const body = (await query_one(a.oauth, id, '')) as OneriveItem
      res.redirect(302, body['@microsoft.graph.downloadUrl']!)
    }
  }
}
