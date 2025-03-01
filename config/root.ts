import fs from 'fs'

import { FileInfo } from '@/types'

export const shinnku_bucket_files_json = JSON.parse(
  fs.readFileSync('data/shinnku_bucket_files.json', { encoding: 'utf8' }),
)

export const galgame0_bucket_files_json = JSON.parse(
  fs.readFileSync('data/galgame0_bucket_files.json', { encoding: 'utf8' }),
)

function generateTree(fileList: FileInfo[]): any {
  const root: { [key: string]: any } = {}

  for (const file of fileList) {
    const filePath = file.file_path
    const pathParts = filePath.split('/')
    let pointer = root
    const l = pathParts.length - 1

    for (let i = 0; i < l; i++) {
      const part = pathParts[i]

      if (pointer[part] === undefined) {
        pointer[part] = {}
      }
      pointer = pointer[part]
    }
    pointer[pathParts[l]] = file
  }

  return root
}

export const shinnku_tree = generateTree(shinnku_bucket_files_json)
export const galgame0_tree = generateTree(galgame0_bucket_files_json)

export const tree = {
  shinnku: shinnku_tree,
  galgame0: galgame0_tree['合集系列']['浮士德galgame游戏合集'],
}
