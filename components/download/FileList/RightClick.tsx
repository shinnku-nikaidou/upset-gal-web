import { useCallback } from 'react'
import { Typography } from 'antd'
import type { MenuProps } from 'antd'
import { Item } from '../../../const/interfaces'
import { nginxTransChar } from '../../../utils'
import t from '../../languages'

const { Text, Link } = Typography

interface IRightClickMenuProps {
  item: Item
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
  ]
}
