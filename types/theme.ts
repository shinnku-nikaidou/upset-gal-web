import type { DirectionType } from 'antd/es/config-provider'

export type Mode = 'light' | 'dark'

export type Theme = {
  url: string
  color: string
  fontSize: number
  direction: DirectionType
  mode: Mode
}

export interface ThemeState extends Theme {
  changeURL: (url: string) => void
  setColor: (value: string) => void
  changeDirection: (dir: DirectionType) => void
  changeFontSize: (fontSize: number) => void
  setMode: (newmode: Mode) => void
}
