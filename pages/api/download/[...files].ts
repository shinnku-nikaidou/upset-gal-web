import { NextApiRequest, NextApiResponse } from 'next'
import config, { account } from '@/config'
import url from 'url'
// import corsControl from '@utils/corsControl'
import root from '@utils/drive'
import { DriveItem } from '@/types'
import { showfiles } from '@/utils/algorithms/showfile'
import query_one from '@/utils/ms-graph/query'
import { OneriveItem } from '@/types/onedrive'
import { cfVerifyEndpoint } from '@/const'
import CryptoJS from 'crypto-js'

const wrong =
  "Something goes wrong, But it's not your fault, please report to shinnku."

const secret = config.CLOUDFLARE.Turnstile.SecretKey

const proxySecretKey = config.proxySecretKey

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
  // res = corsControl(req, res)
  const { cf } = req.query
  let origin = 'https://www.shinnku.com'
  if (req.headers.origin) {
    origin = req.headers.origin
  } else if (req.headers.host) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    origin = `${protocol}://${req.headers.host}`
  }

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
      res.redirect(302, origin + `/human?redirect=${pathname}`)
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
      const randomNumber = Math.random()
      if (
        files &&
        files.length > 0 &&
        (files[0] === '0' || files[0] === 'zd')
      ) {
        const encodedFiles = files.map(encodeURIComponent)
        const newUrl = `https://dl.shinnku.org/file/shinnku/${encodedFiles.join(
          '/',
        )}`.replaceAll('%E2%80%9B', '')
        res.redirect(302, newUrl)
      }

      const accountID = item.sources[0].accountid
      const id = item.sources[0].item.id
      const a = account.find((a) => a.accountID === accountID)!
      const body = (await query_one(a.oauth, id, '')) as OneriveItem
      const _url = body['@microsoft.graph.downloadUrl']!

      if (randomNumber <= 0) {
        const encrypted = CryptoJS.AES.encrypt(_url, proxySecretKey).toString()
        const encoded = encodeURIComponent(encrypted)
        const encodedFiles = encoded.replaceAll('\u201B', '') // remove ‛
        const newUrl = `https://dl.shinnku.com/proxy?&proxyUrl=${encodedFiles}`
        console.log(newUrl)
        res.redirect(302, newUrl)
      } else {
        console.log(_url)
        res.redirect(302, _url)
      }
    }
  }
}
