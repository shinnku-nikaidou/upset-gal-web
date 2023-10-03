import fs from 'fs'
import YAML from 'yaml'
import PATH from 'path'
import {
  Config,
  OauthDrive,
  DriveItem,
  DriveItemChildren,
} from './const/downloadtype'
import query_one from './utils/ms-graph/query'

const default_option =
  'top=10000&select=id,name,size,folder,lastModifiedDateTime,file'

const file = fs.readFileSync('config.yaml', 'utf8')

const config: Config = YAML.parse(file)
export default config

const oauth_drives: Array<OauthDrive> = []
export const get_oauth_drive = (i: number) => oauth_drives[i]

export function initConfig() {
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

  if (!fs.existsSync('.config')) {
    fs.mkdirSync('.config')
    config.ONEDRIVE.forEach(({ ONEDRIVE_NAME }, id) => {
      const oauth_drive = oauth_drives[id]
      fs.mkdirSync(`.config/${ONEDRIVE_NAME}`)
      fs.writeFileSync(
        `.config/${ONEDRIVE_NAME}/oauth.json`,
        JSON.stringify(oauth_drive),
        { encoding: 'utf8' },
      )

      query_one(oauth_drive, 'root', default_option).then((body) => {
        fs.writeFileSync(
          `.config/${ONEDRIVE_NAME}/root.json`,
          JSON.stringify(body),
          { encoding: 'utf8' },
        )
        recursive_get_children(
          body as unknown as DriveItem,
          `.config/${ONEDRIVE_NAME}`,
          oauth_drive,
        )
      })
    })
  }
}

async function recursive_get_children(
  body: DriveItem,
  path: string,
  oauth_drive: OauthDrive,
) {
  path = PATH.join(path, body.name)
  fs.mkdirSync(path)
  const children_path = PATH.join(path, 'child.json')
  await query_one(oauth_drive, `${body.id}/children`, default_option).then(
    async (childs) => {
      fs.writeFileSync(children_path, JSON.stringify(childs), {
        encoding: 'utf8',
      })
      ;(childs as unknown as DriveItemChildren).value
        .filter((i) => i.hasOwnProperty('folder'))
        .forEach(async (i) => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          await recursive_get_children(i, path, oauth_drive)
        })
    },
  )
}
