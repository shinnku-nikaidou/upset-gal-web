import fs from 'fs'
import { initLegacyConfig } from './initLagecyConfig'
import initmusic from './initmusic'

const help = `
    add more parama to pnpm make ***,
    pnpm make init
        initialized the configure.
`

console.log(process.argv)

const order: string = process.argv[2]

if (!fs.existsSync('data')) {
  fs.mkdirSync('data')
}

if (order == 'init') {
  initLegacyConfig()
} else if (order == 'music') {
  initmusic()
} else {
  console.log(help)
}
