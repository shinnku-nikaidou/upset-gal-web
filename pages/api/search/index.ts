import { files } from '@/utils/drive'
import { NextApiRequest, NextApiResponse } from 'next'
import Fuse, { IFuseOptions } from 'fuse.js'
import { NewFrontItem } from '@/types'
import * as OpenCC from 'opencc-js'
import nodejieba from 'nodejieba'

// const cn2tw = OpenCC.Converter({ from: 'cn', to: 'tw' })
// const tw2cn = OpenCC.Converter({ from: 'tw', to: 'cn' })
const cn2jp = OpenCC.Converter({ from: 'cn', to: 'jp' })

const options: IFuseOptions<NewFrontItem> = {
  includeScore: true,
  ignoreLocation: true,
  ignoreFieldNorm: true,
  threshold: 0.75,
  keys: ['name'],
}

const fuse = new Fuse(files, options)

function runsearch(query: string): NewFrontItem[] {
  const tmp = fuse.search(query)
  return tmp.map((result) => result.item)
}

function removeDuplicateCharacters(combinedQuery: string): string {
  return Array.from(new Set(nodejieba.cut(combinedQuery, true))).join('')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { q } = req.query as { q: string }
  if (q === 'files') {
    res.send(files)
  }
  const queryjp = cn2jp(q)
  const query = removeDuplicateCharacters(q + queryjp)
  console.log(query)
  const results = runsearch(query).slice(0, 100)
  res.status(200).send(results)
}
