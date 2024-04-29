import { KeyMap } from '@/types/onedrivelegacy'

export const VERSION = 'v7.1.0'

export function checkversion() {
  if (typeof window === 'object') {
    // Perform localStorage action
    const ver = localStorage.getItem('VERSION')
    if (ver !== VERSION) {
      console.log(`set new version ${VERSION}`)
      localStorage.clear()
    }
    localStorage.setItem('VERSION', VERSION)
  }
}

export const onedriveAccountsLegacy = ['mkw', '03', '04']

export const keyMap: KeyMap = {
  win: 'win',
  apk: 'apk',
  kr: 'krkr',
  ons: 'ons',
  rpg: 'rpg',
  soft: 'tools',
  artroid: 'artroid',
  simulate: 'simulate',
}

export const cfVerifyEndpoint =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export const pcbgurls = [
  'https://www.shinnku.com/img-original/img/2020/05/05/17/35/26/81320307_p0.jpg',
  'https://www.shinnku.com/img-original/img/2020/02/07/19/30/04/79335719_p0.jpg',
]

export const mobgurl =
  'https://www.shinnku.com/img-original/img/2021/06/18/19/34/21/90638095_p0.jpg'

export const adUrl =
  'https://pages.tmall.com/wow/a/act/tmall/dailygroup/16355/16802/wupr?wh_pid=daily-465056&disableNav=YES&status_bar_transparent=true&sellerId=1731640362&activityId=0d5aa047aef44254b970cae5535b2df0&toolName=itemCoupon'

export const ad2Url = 'https://galgame.dev/topic/1933'
