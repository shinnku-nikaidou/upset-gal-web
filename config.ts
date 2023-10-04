import fs from 'fs'
import YAML from 'yaml'
import { OneDrive } from '@/types/downloadtype'

export type Config = {
  PORT: number
  REVERSE_PROXY?: string
  ONEDRIVE: OneDrive
}

const file = fs.readFileSync('config.yaml', 'utf8')

const config: Config = YAML.parse(file)
export default config
