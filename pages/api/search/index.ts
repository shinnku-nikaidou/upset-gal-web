import {
  files,
  fileswithoutpsp,
  fileswithoutraw,
  fileswithoutpspandraw,
} from '@/utils/drive'
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

function runsearch(query: string, files: NewFrontItem[]): NewFrontItem[] {
  const fuse = new Fuse(files, options)
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
  const {
    q,
    psp = '1',
    raw = '1',
  } = req.query as { q: string; psp?: string; raw?: string }
  if (q === 'files') {
    res.send(files)
  }

  let f = files
  if (psp === '0' && raw === '0') {
    f = fileswithoutpspandraw
  } else if (psp !== '0' && raw !== '0') {
    f = files
  } else if (psp === '0' && raw !== '0') {
    f = fileswithoutpsp
  } else if (psp !== '0' && raw === '0') {
    f = fileswithoutraw
  }

  const queryjp = cn2jp(q)
  const query = removeDuplicateCharacters(q + queryjp)
  console.log(query)
  const results = runsearch(query, f)
  res.status(200).send(results)
}
