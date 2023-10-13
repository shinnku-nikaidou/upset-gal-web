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
  color: string
  fontSize: number,
  direction: DirectionType
  hasBGImage: boolean
}

export interface ThemeState extends Theme {
  changePrimaryColor: (value: string) => void
  changeDirection: (dir: DirectionType) => void
  changeFontSize: (fontSize: number) => void
  changeMode: (newMode: Mode) => void
  changeBGI: (flag: boolean) => void
}

export type KeyMap = {
  win: string
  apk: string
  kr: string
  ons: string
  rpg: string
  soft: string
  artroid: string
  simulate: string
}

export type TKey = keyof KeyMap | '10' | null
