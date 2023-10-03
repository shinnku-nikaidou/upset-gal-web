import { OauthDrive } from '../../const/downloadtype'
import getContentWithHeaders from '../getContentWithHeaders'
import fetchAccessToken from './fetchAccessToken'

export default async function query_one(
  oauth_drive: OauthDrive,
  path: string,
  params?: string,
): Promise<Headers> {
  const accessToken = await fetchAccessToken(oauth_drive)

  let uri = oauth_drive.apiUrl + encodeURI(path)
  if (params) uri = uri + '?' + params
  console.log(uri)
  const body = await getContentWithHeaders(uri, {
    Authorization: 'Bearer ' + accessToken,
  } as unknown as Headers)
  return body
}
