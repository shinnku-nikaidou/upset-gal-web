import { KeyMap } from '@/types/theme'

export const VERSION = 'v6.0.0-rc1'

export function checkversion() {
  if (typeof window === 'object') {
    // Perform localStorage action
    const ver = localStorage.getItem('VERSION')
    if (ver !== VERSION) {
      console.log("set new version")
      localStorage.clear()
    }
    localStorage.setItem('VERSION', VERSION)
  }
}

export const onedriveAccountsLegacy = ['mkw12345', '02', '03', '04', 'legacy']

export const keyMap: KeyMap = {
  '0': 'win',
  '1': 'Android直装',
  '2': 'krkr',
  '3': 'ons',
  '4': 'rpg',
  '5': '生肉',
  '6': '模拟器',
  '7': 'Artroid',
}

export const pcDefaultBackgroundImageURL =
  'https://shinnku.com/img-original/img/2020/02/07/19/30/04/79335719_p0.jpg'

export const mobileDefaultBackgroundImageURL =
  'https://shinnku.com/img-original/img/2021/06/18/19/34/21/90638095_p0.jpg'

export const defaultColor = {
  primaryColor: '#1890ff',
  errorColor: '#ff4d4f',
  warningColor: '#faad14',
  successColor: '#52c41a',
  infoColor: '#1890ff',
}
