'use strict'
const a = 'world'

console.log(`Hello ${a}!`)

import { account } from '@/config'
import fs from 'fs'

fs.writeFileSync('tmp.json', JSON.stringify(account), { encoding: 'utf8' })
