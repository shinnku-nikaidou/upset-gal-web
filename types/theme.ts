import type { DirectionType } from 'antd/es/config-provider'

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

