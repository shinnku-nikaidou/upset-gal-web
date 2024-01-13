import { Collapse, Space, Typography } from 'antd/lib'
import t from '@lang'
import Link from 'next/link'

const { Panel } = Collapse
const { Text } = Typography

export const Intro = ({ lang }: { lang: string }) => (
  <Panel header={t('Intro', lang)} key='1'>
    <Space direction='vertical'>
      <Text>{t('Intro1', lang)}</Text>
      <Text>{t('Intro2', lang)}</Text>
    </Space>
  </Panel>
)
