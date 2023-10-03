import { Collapse, Space, Typography } from 'antd'
import t from '../../../utils/languages'

const { Panel } = Collapse
const { Text } = Typography

export const Notice = ({ lang }: { lang: string }) => (
  <Panel header={t('Copyright', lang)} key='4'>
    <Space direction='vertical'>
      <Text>{t('Right1', lang)}</Text>
      <Text>{t('Right2', lang)}</Text>
      <Text>法律を調べて遵守する取り組みは。</Text>
      <Text>
        you are still responsible to research and comply with local laws.
      </Text>
      <Text>{t('Right3', lang)}</Text>
    </Space>
  </Panel>
)
