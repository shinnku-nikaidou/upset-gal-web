import { useCallback } from 'react'
import t from '@lang'
import { nginxTransChar } from '@algorithm'
import { FrontItem } from '@/types'
import { Link, Text } from '@chakra-ui/react'

interface IRightClickMenuProps {
  item: FrontItem
  url: string
  lang: string
}

export const GenerateRightClickMenu = ({
  item,
  url,
  lang,
}: IRightClickMenuProps) => {
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
          href={'https://01.congyu.moe/auth/register?invite=e30dc2bc97'}
        >
          下载慢? 说明被运营商掐网络了, 试试丛雨vpn
        </Link>
      ),
      key: '3',
    },
  ]
}
