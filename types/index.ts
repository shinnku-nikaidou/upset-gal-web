import { OneriveItem, OnedriveAccount } from './onedrive'

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
}

export type FolderItem = Item & {
  '@type': 'folder'
  childrens: Array<DriveItem>
}

export type DriveBase = {
  accountid: string
  system: DriveType
  item: any
}

export type OnedriveBase = DriveBase & {
  system: DriveType.OneDrive
  item: OneriveItem
}

export type Drive = OnedriveBase

export type DriveItem = (FileItem | FolderItem) & {
  sources: Array<Drive>
}

export type Account = Array<AccountItem>

export type AccountItemBase = {
  name: string
  type: DriveType
}

export type AccountOnedriveItem = AccountItemBase & {
  type: DriveType.OneDrive
  onedrive: OnedriveAccount
}

export type AccountItem = AccountOnedriveItem
