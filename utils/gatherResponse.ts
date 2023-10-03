export default async function gatherResponse(response: Response) {
  const { headers } = response
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const contentType = headers.get('content-type')!
  if (contentType.includes('application/json')) {
    return await response.json()
  } else if (
    // eslint-disable-next-line no-constant-condition
    contentType.includes('application/text') ||
    contentType.includes('text/html') ||
    true
  ) {
    return await response.text()
  }
}
