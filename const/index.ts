import { KeyMap } from '@/types/onedrivelegacy'

export const VERSION = 'v6.2.0'

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

export const onedriveAccountsLegacy = ['mkw12345', '03', '04', 'legacy']

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

export const pcbgurls = [
  'https://cn.shinnku.com/img-original/img/2020/05/05/17/35/26/81320307_p0.jpg',
  'https://cn.shinnku.com/img-original/img/2020/02/07/19/30/04/79335719_p0.jpg',
]

export const mobgurl =
  'https://cn.shinnku.com/img-original/img/2021/06/18/19/34/21/90638095_p0.jpg'
