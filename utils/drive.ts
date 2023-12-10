import { account } from '@/config'
import { Account, DriveType, FolderItem } from '@/types'
import fs from 'fs'
import query_one from './ms-graph/query'
import { OnedriveItemChildren, OneriveItem } from '@/types/onedrive'

// eslint-disable-next-line prefer-const
let root: FolderItem = (() => {
  try {
    return JSON.parse(fs.readFileSync('data/root.json', { encoding: 'utf8' }))
  } catch {
    return {}
  }
})()

export async function dom(): Promise<FolderItem> {
  const root: FolderItem = {
    '@type': 'folder',
    date: '2023-12-31',
    size: 0,
    sources: [],
    name: 'root',
    childrens: [],
  }
  for (let i = 0; i < account.length; i++) {
    const a = account[i]
    const account_root_info = (await query_one(
      account[i].oauth,
      'root',
    )) as OneriveItem
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

  for (let i = 0; i < root.childrens.length; i++) {
    await dfsonedrive(root.childrens[i] as FolderItem, account[i])
  }

  return root
}

async function dfsonedrive(item: FolderItem, a: Account) {
  const id = item.sources[0].item.id
  const childrens = (await query_one(
    a.oauth,
    id + '/children',
  )) as OnedriveItemChildren
  console.log(JSON.stringify(childrens.value))
  for (let i = 0; i < childrens.value.length; i++) {
    const onedrive = childrens.value[i]
    const base = {
      date: onedrive.lastModifiedDateTime,
      name: onedrive.name,
      size: onedrive.size,
      sources: [
        {
          accountid: a.accountID,
          system: DriveType.OneDrive,
          item: onedrive,
        },
      ],
    }
    if (onedrive.hasOwnProperty('folder')) {
      item.childrens.push({
        '@type': 'folder',
        childrens: [],
        ...base,
      })
      await dfsonedrive(item.childrens[i] as FolderItem, a)
    } else if (onedrive.hasOwnProperty('file')) {
      item.childrens.push({
        '@type': 'file',
        ...base,
      })
    }
  }
}

export default root

export function renewFiles() {
  const ans: Array<string> = []
  function dfs(r: FolderItem, path: string) {
    r.childrens.forEach((c) => {
      const p = path + '/' + c.name
      if (c['@type'] === 'file') {
        ans.push(p)
      } else {
        dfs(c, p)
      }
    })
  }
  dfs(root, '')
  return ans
}

// eslint-disable-next-line prefer-const
let files = renewFiles()

export { files }
