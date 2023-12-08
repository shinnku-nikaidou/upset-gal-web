import { AccountOnedriveItem } from '@/types'

export const onedriveTransAccount = (account: AccountOnedriveItem) => {
  return {
    accountID: account.name,
    type: account.type,
    oauth: {
      refreshToken: account.onedrive.onedriveRefeshtoken,
      clientId: account.onedrive.clientId,
      clientSecret: account.onedrive.clientSecret,
      oauthUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/',
      apiUrl: 'https://graph.microsoft.com/v1.0/me/drive/items/',
    },
  }
}
