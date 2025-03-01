import fs from 'fs'

import { generateTree } from '@/algorithm/tree'

export const shinnku_bucket_files_json = JSON.parse(
  fs.readFileSync('data/shinnku_bucket_files.json', { encoding: 'utf8' }),
)

export const galgame0_bucket_files_json = JSON.parse(
  fs.readFileSync('data/galgame0_bucket_files.json', { encoding: 'utf8' }),
)

export const shinnku_tree = generateTree(shinnku_bucket_files_json)
export const galgame0_tree = generateTree(galgame0_bucket_files_json)

export const tree = {
  shinnku: shinnku_tree,
  galgame0: galgame0_tree['合集系列']['浮士德galgame游戏合集'],
}
