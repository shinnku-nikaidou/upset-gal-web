import { DriveItem } from '@/types'
import fs from 'fs'

const root = JSON.parse(
  fs.readFileSync('root.json', { encoding: 'utf8' }),
) as DriveItem

export default root
