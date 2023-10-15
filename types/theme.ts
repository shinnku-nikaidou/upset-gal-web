import type { DirectionType } from 'antd/es/config-provider'

export type Item = {
  '@type': 'folder' | 'file'
  date: string
  name: string
  size: string
}

export type Mode = 'light' | 'dark'

export type Theme = {
  url: string
  color: string
  fontSize: number
  direction: DirectionType
  hasBGImage: boolean
  mode: Mode
}

export interface ThemeState extends Theme {
  setColor: (value: string) => void
  changeDirection: (dir: DirectionType) => void
  changeFontSize: (fontSize: number) => void
  setHasBGI: (flag: boolean) => void
  setMode: (newmode: Mode) => void
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
