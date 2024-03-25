export const nginxTransChar = (uri: string) =>
  uri.replace(/%/g, '%25').replace(/ /g, '%20')

export const rewriteUrl = (url: string, proxy: string | undefined) => {
  if (typeof proxy === 'undefined') {
    return url
  }

  if (proxy.endsWith('/')) {
    proxy = proxy.slice(0, -1)
  }

  return url.replace(/https:\/\/\w+\.sharepoint\.com/, proxy)
}
