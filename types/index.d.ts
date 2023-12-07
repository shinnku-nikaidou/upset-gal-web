export type Audio = {
  name: string
  artist?: string
  url: string
  cover?: string
  lrc?: string
  theme?: string
}

export type FrontItem = {
  '@type': 'file' | 'folder'
  date: string
  name: string
  size: string
}
