import fs from 'fs'
import YAML from 'yaml'
import { OauthDrive } from '@/types/onedrive'
import { CloudFlare } from '@/types/cloudflare'
import { LegacyOneDrive } from '@/types/onedrivelegacy'
import { RawAccount, AccountItem, DriveType } from './types'
import { onedriveTransAccount } from './utils/ms-graph'

export type Config = {
  SITE: string
  PORT: number
  LEGACY_ONECRIVE: LegacyOneDrive
  CLOUDFLARE: CloudFlare
  ACCOUNT: RawAccount
  proxySecretKey: string
}

const file = fs.readFileSync('config.yaml', 'utf8')

const config: Config = YAML.parse(file)
export default config

export const LEGACY_ONECRIVE_OAUTH: Array<OauthDrive> =
  config.LEGACY_ONECRIVE.map((account) => ({
    refreshToken: account.ONEDRIVE_REFRESHTOKEN,
    clientId: account.clientId,
    clientSecret: account.clientSecret,
    oauthUrl: account.loginHost + '/common/oauth2/v2.0/',
    apiUrl: account.apiHost + '/v1.0/me/drive/items/',
  }))

export const account = config.ACCOUNT.map((account: AccountItem) => {
  switch (account.type) {
    case DriveType.OneDrive:
      return onedriveTransAccount(account)
    default:
      throw Error
  }
})
