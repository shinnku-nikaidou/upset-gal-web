import { NextPageContext } from 'next'

export async function userDefaultInfoProp(ctx: NextPageContext) {
  let language = ctx.req?.headers['accept-language'] || 'en,'
  language = language.substring(0, language.indexOf(','))
  const isMobileView = (
    (ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent) as string
  ).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
  const isMobile = Boolean(isMobileView)
  return {
    isMobile: isMobile,
    language: language,
  }
}

export default interface DefaultInfoProp {
  isMobile: boolean
  language: string
}
