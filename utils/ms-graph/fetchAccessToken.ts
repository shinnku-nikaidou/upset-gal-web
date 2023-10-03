import { OauthDrive, AccessToken } from '@const/downloadtype'
import fetchFormData from '@utils/net/fetchFormData'

export default async function fetchAccessToken(
  oauth_drive: OauthDrive,
): Promise<string> {
  const refreshToken = oauth_drive.refreshToken

  const url = oauth_drive['oauthUrl'] + 'token'
  const data: AccessToken = {
    client_id: oauth_drive.clientId,
    client_secret: oauth_drive.clientSecret,
    grant_type: 'refresh_token',
    requested_token_use: 'on_behalf_of',
    refresh_token: refreshToken,
  }
  const result = await fetchFormData(url, data)

  return result.access_token
}
