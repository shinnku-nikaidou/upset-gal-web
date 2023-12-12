import { OneriveItem, OnedriveAccount, OauthDrive } from './onedrive'

export type Audio = {
  name: string
  artist?: string
  url: string
  cover?: string
  lrc?: string
  theme?: string
}

export type Item = {
  '@type': 'file' | 'folder'
  date: string
  name: string
  size: number
}

export type FrontItem = {
  '@type': 'file' | 'folder'
  date: string
  name: string
  size: string
}

export type NewFrontItem = {
  name: string
  size: string
}

export enum DriveType {
  OneDrive = 'onedrive',
  OnedriveCn = 'onedrive cn',
  GoogleDrive = 'google drive',
  Mega = 'mega',
  DropBox = 'dropbox',
  S3 = 's3',
  FS = 'filesystem',
  unknown = 'unknown',
}

export type FileItem = Item & {
  '@type': 'file'
  sources: Array<Drive>
}

export type FolderItem = Item & {
  '@type': 'folder'
  childrens: Array<DriveItem>
  sources: Array<Drive>
}

export type DriveBase = {
  accountid: string
  system: DriveType
  item: OneriveItem
}

export type OnedriveBase = DriveBase & {
  accountid: string
  item: OneriveItem
}

export type Drive = OnedriveBase

export type DriveItem = FileItem | FolderItem

export type RawAccount = Array<AccountItem>

export type Account = {
  accountID: string
  type: DriveType
  point: string
  oauth: OauthDrive
}

export type AccountItemBase = {
  name: string
  type: DriveType
  point: string
}

export type AccountOnedriveItem = AccountItemBase & {
  type: DriveType.OneDrive
  onedrive: OnedriveAccount
}

export type AccountItem = AccountOnedriveItem
