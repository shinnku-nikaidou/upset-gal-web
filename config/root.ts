import fs from 'fs'

export const shinnku_bucket_files_json = JSON.parse(
  fs.readFileSync('data/shinnku_bucket_files.json', { encoding: 'utf8' }),
)

export const galgame0_bucket_files_json = JSON.parse(
  fs.readFileSync('data/galgame0_bucket_files.json', { encoding: 'utf8' }),
)
