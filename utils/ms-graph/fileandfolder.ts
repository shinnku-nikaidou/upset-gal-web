import PATH from 'path'
import fs from 'fs'
import { OauthDrive, OnedriveItemChildren, OneriveItem } from '@/types/onedrive'
import query_one from './query'
import config from '@/config'
import { cfVerifyEndpoint } from '@/const'
import { showfileslegacy } from '@utils/algorithms/showfile'

type BodyCacheItem = {
  body: OneriveItem
  timestamp: number
}

const secret = config.CLOUDFLARE.Turnstile.SecretKey

const cache: Map<string, BodyCacheItem> = new Map()

function isvalidcache(c: BodyCacheItem) {
  const currentTime = Date.now()
  const elapsedTime = currentTime - c.timestamp
  return elapsedTime <= 300000
}

export default async function fileandfolder(
  oauth_drive: OauthDrive,
  childs: OnedriveItemChildren,
  node: string,
  path: Array<string>,
) {
  const child = childs.value.find(({ name }) => name == node)
  if (!child) {
    return undefined
  }
  if (child.hasOwnProperty('folder')) {
    const child_childs = JSON.parse(
      fs.readFileSync(
        PATH.join('data', 'legacy', ...path, node, 'child.json'),
        {
          encoding: 'utf8',
        },
      ),
    ) as OnedriveItemChildren
    return showfileslegacy(child_childs)
  } else if (child.hasOwnProperty('file')) {
    const c = cache.get(child.id)
    let item: OneriveItem
    if (c && isvalidcache(c)) {
      item = c.body
      console.log(`cache ${child.id}`)
    } else {
      item = (await query_one(oauth_drive, child.id, '')) as OneriveItem
      cache.set(child.id, {
        body: item,
        timestamp: Date.now(),
      })
      console.log(`query one ${child.name} ${child.id}`)
    }
    return item['@microsoft.graph.downloadUrl']
  }
}
