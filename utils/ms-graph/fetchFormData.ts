import { AccessToken } from '@/types/downloadtype'
import gatherResponse from '@utils/net/gatherResponse'
import fetch from 'isomorphic-fetch'
import FormData from 'form-data'

export default async function fetchFormData(
  url: RequestInfo,
  data: AccessToken,
) {
  // const FormData = FormData;
  const formdata = new FormData()
  Object.entries(data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([k, _]) => data.hasOwnProperty(k))
    .forEach(([k, v]) => formdata.append(k, v))
  const requestOptions = {
    method: 'POST',
    body: formdata,
  }
  const response = await fetch(url, requestOptions as any)
  return await gatherResponse(response)
}
