import type { DirectionType } from 'antd/es/config-provider'

export type Item = {
  '@type': 'folder' | 'file'
  date: string
  name: string
  size: string
}

export type Mode = 'light' | 'dark'

export type Theme = {
  mode: Mode
  url: string
  color: {
    primaryColor: string
    errorColor: string
    warningColor: string
    successColor: string
    infoColor: string
  }
  mobile: boolean
  direction?: DirectionType
  hasBGImage: boolean
}

export interface ThemeState {
  mode: Mode
  url: string
  direction?: DirectionType
  hasBGImage: boolean

  changePrimaryColor: (value: string) => void
  changeDirection: (dir: DirectionType) => void
  changeMode: (newMode: Mode) => void
  changeBGI: (flag: boolean) => void
}

export type KeyMap =  {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
}

export type TKey = keyof KeyMap | '10' | null
