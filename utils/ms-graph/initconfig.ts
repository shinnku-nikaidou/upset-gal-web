import fs from 'fs'
import YAML from 'yaml'
import PATH from 'path'
import {
  Config,
  OauthDrive,
  DriveItem,
  DriveItemChildren,
} from '@/types/downloadtype'
import query_one from './query'

const default_option =
  'top=10000&select=id,name,size,folder,lastModifiedDateTime,file'

const file = fs.readFileSync('config.yaml', 'utf8')

const config: Config = YAML.parse(file)
export default config

const oauth_drives: Array<OauthDrive> = []
export const get_oauth_drive = (i: number) => oauth_drives[i]

export function initLegacyConfig() {
  config.ONEDRIVE.forEach((account) =>
    oauth_drives.push({
      redirectUri: account.redirectUri,
      refreshToken: account.ONEDRIVE_REFRESHTOKEN,
      clientId: account.clientId,
      clientSecret: account.clientSecret,
      oauthUrl: account.loginHost + '/common/oauth2/v2.0/',
      apiUrl: account.apiHost + '/v1.0/me/drive/items/',
      scope: account.apiHost + '/Files.ReadWrite.All offline_access',
    }),
  )

  if (!fs.existsSync('data')) {
    fs.mkdirSync('data')
  }

  if (!fs.existsSync('data/legacy')) {
    fs.mkdirSync('data/legacy')
  } else {
    return
  }

  config.ONEDRIVE.forEach(({ ONEDRIVE_NAME }, id) => {
    const oauth_drive = oauth_drives[id]
    fs.mkdirSync(`data/legacy/${ONEDRIVE_NAME}`)
    fs.writeFileSync(
      `data/legacy/${ONEDRIVE_NAME}/oauth.json`,
      JSON.stringify(oauth_drive),
      { encoding: 'utf8' },
    )

    query_one(oauth_drive, 'root', default_option).then((body) => {
      fs.writeFileSync(
        `data/legacy/${ONEDRIVE_NAME}/root.json`,
        JSON.stringify(body),
        { encoding: 'utf8' },
      )
      recursive_get_children(
        body as unknown as DriveItem,
        `data/legacy/${ONEDRIVE_NAME}`,
        oauth_drive,
      )
    })
  })
}

export async function recursive_get_children(
  body: DriveItem,
  path: string,
  oauth_drive: OauthDrive,
) {
  path = PATH.join(path, body.name)
  fs.mkdirSync(path)
  const children_path = PATH.join(path, 'child.json')
  await query_one(oauth_drive, `${body.id}/children`, default_option).then(
    async (childs: Headers) => {
      fs.writeFileSync(children_path, JSON.stringify(childs), {
        encoding: 'utf8',
      })
      const value = (childs as unknown as DriveItemChildren).value
      value
        .filter((item) => item.hasOwnProperty('folder'))
        .forEach(async (item) => {
          await recursive_get_children(item, path, oauth_drive)
        })
    },
  )
}
