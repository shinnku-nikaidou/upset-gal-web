import res_zh_TW from '../lang/zh-TW'
import res_en from '../lang/en'
import res_zh_CN from '../lang/zh-CN'

const getLang = (s: string) => {
  if (s === undefined) return res_en
  else if (s.toString().startsWith('en')) {
    return res_en
  }
  switch (s) {
    case 'zh-CN':
      return res_zh_CN
    case 'zh-TW':
      return res_zh_TW
  }
  return res_en
}

const t = (s: keyof typeof res_en, language: string): string => {
  const lang = getLang(language)
  return lang[s]
}

export default t
