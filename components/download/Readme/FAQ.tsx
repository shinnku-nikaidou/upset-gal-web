import { Collapse, Space, Typography } from 'antd'
import t from '../../../utils/languages'

const { Panel } = Collapse
const { Text } = Typography

export const FAQ = (props: { lang: string }) => (
  <Panel header='FAQ' key='3'>
    <Space direction='vertical'>
      <Text>{t('IDM', props.lang)}</Text>
      <Text>
        网站下载不限速，如果下载很慢请说明被运营商拦截限制了，试试
        <Text strong>切换至流量/使用上面👆的机场开启vpn下载</Text>。
      </Text>
    </Space>
  </Panel>
)
