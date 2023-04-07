import { useCallback, useMemo } from 'react'
import { Menu, Typography } from 'antd'
import { Item } from '../../../data/interfaces'
import { nginxTransChar } from '../../../utils'
import t from '../../languages'

const { Text, Link } = Typography

interface IRightClickMenuProps {
  item: Item
  url: string
  lang: string
}

export const RightClickMenu = ({ item, url, lang }: IRightClickMenuProps) => {
  const downloadLink = useMemo(() => {
    return `${window.location.origin}/${url}/${nginxTransChar(item.name)}`
  }, [url, item.name])

  const copyLink = useCallback(
    () => navigator.clipboard.writeText(downloadLink),
    [downloadLink],
  )

  return (
    <Menu
      items={[
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
      ]}
    />
  )
}
