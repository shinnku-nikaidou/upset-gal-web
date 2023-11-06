import fs from 'fs'
import YAML from 'yaml'
import { OauthDrive, OneDriveLegacy } from '@/types/downloadtype'

export type Config = {
  PORT: number
  REVERSE_PROXY?: string
  LEGACY_ONECRIVE: OneDriveLegacy
}

const file = fs.readFileSync('config.yaml', 'utf8')

const config: Config = YAML.parse(file)
export default config

export const default_option =
  'top=10000&select=id,name,size,folder,lastModifiedDateTime,file'

export const LEGACY_ONECRIVE = config.LEGACY_ONECRIVE

export const LEGACY_ONECRIVE_OAUTH: Array<OauthDrive> = LEGACY_ONECRIVE.map(
  (account) => ({
    redirectUri: account.redirectUri,
    refreshToken: account.ONEDRIVE_REFRESHTOKEN,
    clientId: account.clientId,
    clientSecret: account.clientSecret,
    oauthUrl: account.loginHost + '/common/oauth2/v2.0/',
    apiUrl: account.apiHost + '/v1.0/me/drive/items/',
    scope: account.apiHost + '/Files.ReadWrite.All offline_access',
  }),
)
