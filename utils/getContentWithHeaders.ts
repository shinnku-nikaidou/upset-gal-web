import gatherResponse from './net/gatherResponse'
import fetch from 'isomorphic-fetch'

export default async function getContentWithHeaders(
  url: RequestInfo,
  headers: Headers,
) {
  const response = await fetch(url, { headers })
  return await gatherResponse(response)
}
