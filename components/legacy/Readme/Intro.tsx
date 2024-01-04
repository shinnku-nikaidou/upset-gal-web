import { Collapse, Space, Typography } from 'antd/lib'
import t from '@lang'
import Link from 'next/link'

const { Panel } = Collapse
const { Text } = Typography

export const Intro = ({ lang }: { lang: string }) => (
  <Panel header={t('Intro', lang)} key='1'>
    <Space direction='vertical'>
      <Text>
        史上最好最棒的galgame论坛来咯, 暨终点死亡一个月后, 大家们的新家,
        欢迎来到{' '}
        <Link target='_blank' href={'https://bbs.shinnku.com'}>
          真紅の資源討論組
        </Link>
      </Text>
      <Text>{t('Intro1', lang)}</Text>
      <Text>{t('Intro2', lang)}</Text>
    </Space>
  </Panel>
)
