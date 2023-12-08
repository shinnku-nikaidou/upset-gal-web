export type AccessToken = {
  client_id: string
  client_secret: string
  grant_type: 'refresh_token' | 'authorization_code'
  requested_token_use?: 'on_behalf_of'
  refresh_token: string
  code?: string
  redirect_uri?: string
}

export type OneriveItem = {
  id: string
  name: string
  folder?: {
    childCount: number
  }
  size: number
  lastModifiedDateTime: string
  file?: {
    mimeType: string
    hashes: {
      quickXorHash: string
    }
  }
}

export type OnedriveAccount = {
  clientId: string
  clientSecret: string
  onedriveRefeshtoken: string
}

export type OnedriveItemChildren = {
  '@odata.context': string
  value: Array<OneriveItem>
}

export type OauthDrive = {
  refreshToken: string
  clientId: string
  clientSecret: string
  oauthUrl: string
  apiUrl: string
}
