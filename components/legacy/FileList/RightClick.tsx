import { useCallback } from 'react'
import { Typography } from 'antd/lib'
import type { MenuProps } from 'antd/lib'
import t from '@lang'
import { nginxTransChar } from '@algorithm'
import { FrontItem } from '@/types'

const { Text, Link } = Typography

interface IRightClickMenuProps {
  item: FrontItem
  url: string
  lang: string
}

export const GenerateRightClickMenu = ({
  item,
  url,
  lang,
}: IRightClickMenuProps): MenuProps['items'] => {
  const downloadLink = `${window.location.origin}/${url}/${nginxTransChar(
    item.name,
  )}`

  const copyLink = useCallback(
    () => navigator.clipboard.writeText(downloadLink),
    [downloadLink],
  )

  return [
    {
      label: (
        <Link target='_blank' href={downloadLink}>
          {t('Download1', lang)} {item.name}
        </Link>
      ),
      key: '1',
    },
    {
      label: <Text onClick={copyLink}>{t('Download2', lang)}</Text>,
      key: '2',
    },
    {
      label: (
        <Link
          target='_blank'
          href={'https://congyu.moe/auth/register?code=e30dc2bc97'}
        >
          下载慢? 说明被运营商掐网络了, 试试丛雨vpn
        </Link>
      ),
      key: '3',
    },
  ]
}
