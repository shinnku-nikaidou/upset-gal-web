import { NextPageContext } from 'next'

export async function addDefaultProp(ctx: NextPageContext) {
  let language = ctx.req?.headers['accept-language'] || 'en,'
  language = language.substring(0, language.indexOf(','))
  console.log(language)
  const isMobileView = (
    (ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent) as string
  ).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
  const isMobile = Boolean(isMobileView)
  console.log(`isMobile is ${isMobile}`)
  return {
    isMobile: isMobile,
    language: language,
  }
}