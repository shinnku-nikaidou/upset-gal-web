import fs from 'fs'
import { dom } from '@/utils/drive'

export async function initConfig() {
  const root = await dom()
  fs.writeFileSync('data/root.json', JSON.stringify(root), { encoding: 'utf8' })
}
