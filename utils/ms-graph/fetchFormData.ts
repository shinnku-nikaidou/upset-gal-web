import { AccessToken } from '@/types/onedrive'
import { gatherResponse } from '@net'
import fetch from 'isomorphic-fetch'
import FormData from 'form-data'

export default async function fetchFormData(
  url: RequestInfo,
  data: AccessToken,
) {
  const formdata = new FormData()
  Object.entries(data)
    .filter(([k, _]) => data.hasOwnProperty(k))
    .forEach(([k, v]) => formdata.append(k, v))
  const requestOptions = {
    method: 'POST',
    body: formdata,
  }
  const response = await fetch(url, requestOptions as any)
  return await gatherResponse(response)
}
