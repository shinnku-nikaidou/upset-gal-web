import { OauthDrive } from "../../../data/downloadtype";
import getContentWithHeaders from "../../../utils/getContentWithHeaders";
import fetchAccessToken from "./_fetchAccessToken";

export default async function query_one(
  oauth_drive: OauthDrive,
  path: string = "root",
  params?: string
): Promise<Headers> {
  const accessToken = await fetchAccessToken(oauth_drive);

  let uri = oauth_drive.apiUrl + encodeURI(path);
  if (params) uri = uri + "?" + params;
  console.log(uri);
  const body = await getContentWithHeaders(uri, {
    Authorization: "Bearer " + accessToken,
  } as unknown as Headers);
  return body;
}
