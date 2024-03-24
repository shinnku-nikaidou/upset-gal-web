export type Mode = 'light' | 'dark'

export type Theme = {
  url: string
  color: string
  fontSize: number
  mode: Mode
}

export interface ThemeState extends Theme {
  changeURL: (url: string) => void
  setColor: (value: string) => void
  changeFontSize: (fontSize: number) => void
  setMode: (newmode: Mode) => void
}
