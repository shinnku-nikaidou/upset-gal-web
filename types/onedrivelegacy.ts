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

export type Item = {
  '@type': 'folder' | 'file'
  date: string
  name: string
  size: string
}
