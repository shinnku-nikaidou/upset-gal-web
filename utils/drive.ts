import { account } from '@/config'
import { DriveItem } from '@/types'
import fs from 'fs'
import query_one from './ms-graph/query'

const root: DriveItem = JSON.parse(
  fs.readFileSync('data/root.json', { encoding: 'utf8' }),
)

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
    const account_root_info = await query_one(oauth, 'root')
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
  }
  return root
}

export default root
