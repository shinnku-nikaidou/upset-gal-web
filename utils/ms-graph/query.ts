import { OauthDrive, OneriveItem } from '@/types/onedrive'
import { getContentWithHeaders } from '@net'
import fetchAccessToken from './fetchAccessToken'

export default async function query_one(
  oauth_drive: OauthDrive,
  path: string,
  params = 'top=10000&select=id,name,size,folder,lastModifiedDateTime,file',
): Promise<OneriveItem> {
  const accessToken = await fetchAccessToken(oauth_drive)

  let uri = oauth_drive.apiUrl + encodeURI(path)
  if (params) uri = uri + '?' + params
  console.log(uri)
  const body = await getContentWithHeaders(uri, {
    Authorization: 'Bearer ' + accessToken,
  } as unknown as Headers)
  return body
}
