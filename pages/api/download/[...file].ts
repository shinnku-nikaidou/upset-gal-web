import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import config from '@/config'
import corsControl from '@utils/corsControl'
import url from 'url'

const users = config.LEGACY_ONECRIVE.map((user) => user.ONEDRIVE_NAME)
const wrong =
  "Something goes wrong, But it's not your fault, please report to 真红."

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

  res.send('')
}
