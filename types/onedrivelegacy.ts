export type LegacyOneDrive = Array<LegacyOnedriveAccount>

export type LegacyOnedriveAccount = {
  ONEDRIVE_NAME: string
  ONEDRIVE_REFRESHTOKEN: string
  clientId: string
  clientSecret: string
  loginHost: string
  apiHost: string
  redirectUri: string
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

export type Item = {
  '@type': 'folder' | 'file'
  date: string
  name: string
  size: string
}
