import fs from 'fs'
import PATH from 'path'
import { OauthDrive, DriveItem, DriveItemChildren } from '@/types/downloadtype'
import query_one from '@/utils/ms-graph/query'
import {
  default_option,
  LEGACY_ONECRIVE_OAUTH,
  LEGACY_ONECRIVE,
} from '@/config'

export async function initLegacyConfig() {
  if (!fs.existsSync('data/_legacy')) {
    fs.mkdirSync('data/_legacy')
  } else {
    return
  }

  LEGACY_ONECRIVE.forEach(async ({ ONEDRIVE_NAME }, id) => {
    const onedrive_oauth = LEGACY_ONECRIVE_OAUTH[id]
    fs.mkdirSync(`data/_legacy/${ONEDRIVE_NAME}`)
    fs.writeFileSync(
      `data/_legacy/${ONEDRIVE_NAME}/oauth.json`,
      JSON.stringify(onedrive_oauth),
      { encoding: 'utf8' },
    )

    await query_one(onedrive_oauth, 'root', default_option).then(
      async (body) => {
        fs.writeFileSync(
          `data/_legacy/${ONEDRIVE_NAME}/root.json`,
          JSON.stringify(body),
          { encoding: 'utf8' },
        )
        await recursive_get_children(
          body as unknown as DriveItem,
          `data/_legacy/${ONEDRIVE_NAME}`,
          onedrive_oauth,
        )
      },
    )
  })
}

export async function recursive_get_children(
  body: DriveItem,
  path: string,
  oauth_drive: OauthDrive,
) {
  path = PATH.join(path, body.name)
  fs.mkdirSync(path)
  const children_path = PATH.join(path, 'child.json')
  await query_one(oauth_drive, `${body.id}/children`, default_option).then(
    async (childs: Headers) => {
      fs.writeFileSync(children_path, JSON.stringify(childs), {
        encoding: 'utf8',
      })
      const value = (childs as unknown as DriveItemChildren).value
      value
        .filter((item) => item.hasOwnProperty('folder'))
        .forEach(async (item) => {
          await recursive_get_children(item, path, oauth_drive)
        })
    },
  )
}
