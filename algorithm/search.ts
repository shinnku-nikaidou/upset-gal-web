import Fuse, { IFuseOptions } from 'fuse.js'
import * as OpenCC from 'opencc-js'
import nodejieba from 'nodejieba'

import { trim_file_path } from './url'

import { BucketFiles, SearchItem, SearchList } from '@/types'

export const cn2tw = OpenCC.Converter({ from: 'cn', to: 'tw' })
export const tw2cn = OpenCC.Converter({ from: 'tw', to: 'cn' })
export const cn2jp = OpenCC.Converter({ from: 'cn', to: 'jp' })

const options: IFuseOptions<SearchItem> = {
  includeScore: true,
  ignoreLocation: true,
  ignoreFieldNorm: true,
  threshold: 0.75,
  keys: ['id'],
}

export function runsearch(query: string, files: SearchList): SearchList {
  const fuse = new Fuse(files, options)
  const tmp = fuse.search(query)

  return tmp.map((result) => result.item)
}

export function removeDuplicateCharacters(combinedQuery: string): string {
  return Array.from(new Set(nodejieba.cut(combinedQuery, true))).join('')
}

export function aggregate_builder(...b: Array<BucketFiles>) {
  return b.flat().map((item) => {
    return {
      id: trim_file_path(item.file_path),
      info: item,
    }
  })
}
