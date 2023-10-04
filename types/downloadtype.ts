export type AccessToken = {
  client_id: string
  client_secret: string
  grant_type: 'refresh_token' | 'authorization_code'
  requested_token_use?: 'on_behalf_of'
  refresh_token: string
  code?: string
  redirect_uri?: string
}

export type OneDrive = Array<Account>

export type DriveItem = {
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

export type FrontItem = {
  '@type': 'file' | 'folder'
  date: string
  name: string
  size: string
}

export type DriveItemChildren = {
  '@odata.context': string
  value: Array<DriveItem>
}

export type Account = {
  ONEDRIVE_NAME: string
  EXPOSE_PATH: string
  ONEDRIVE_REFRESHTOKEN: string
  clientId: string
  clientSecret: string
  loginHost: string
  apiHost: string
  redirectUri: string
}

export type OauthDrive = {
  redirectUri: string
  refreshToken: string
  clientId: string
  clientSecret: string
  oauthUrl: string
  apiUrl: string
  scope: string
}
