import { account } from '@/config'
import { DriveItem } from '@/types'
import fs from 'fs'
import query_one from './ms-graph/query'
import { OauthDrive, OneriveItem } from '@/types/onedrive'

const root: DriveItem = (() => {
  try {
    return JSON.parse(fs.readFileSync('data/root.json', { encoding: 'utf8' }))
  } catch {
    return {}
  }
})()

export async function dom(): Promise<DriveItem> {
  const root: DriveItem = {
    '@type': 'folder',
    date: '2023-12-31',
    size: 0,
    sources: [],
    name: 'root',
    childrens: [],
  }
  for (let i = 0; i < account.length; i++) {
    const a = account[i]
    const oauth = a.oauth
    const account_root_info = (await query_one(oauth, 'root')) as OneriveItem
    root.childrens.push({
      '@type': 'folder',
      date: account_root_info.lastModifiedDateTime,
      size: account_root_info.size,
      sources: [
        { accountid: a.accountID, system: a.type, item: account_root_info },
      ],
      name: a.point,
      childrens: [],
    })
    await dfsonedrive(oauth, root.childrens[i])
  }
  return root
}

async function dfsonedrive(oauth: OauthDrive, item: DriveItem) {
  const id = item.sources[0].item.id
  const onedrive_item = await query_one(oauth, id + '/children')
  if (item['@type'] == 'folder') {
    item.childrens
  }
}

export default root
