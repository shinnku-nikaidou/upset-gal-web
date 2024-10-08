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

export const onedriveAccountsLegacy = ['mkw']

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
  '/img-original/img/2020/05/05/17/35/26/81320307_p0.jpg',
  '/img-original/img/2020/02/07/19/30/04/79335719_p0.jpg',
]

export const mobgurl = '/img-original/img/2021/06/18/19/34/21/90638095_p0.jpg'
