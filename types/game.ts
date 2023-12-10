export type GalLink = {
  url: string
  preview: string
}

export type GameItem = {
  name: string
  keywords: Array<string>
  description: string
  developer?: string
  links: GalLink[]
}

export type Game = {
  key: number
  backgroundImage?: string
  ja?: GameItem
  zh?: GameItem
  en?: GameItem
}
