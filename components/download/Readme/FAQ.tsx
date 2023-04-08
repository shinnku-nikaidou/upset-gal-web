import { Collapse, Space, Typography } from 'antd'

const { Panel } = Collapse
const { Text } = Typography

export const FAQ = (props: { lang: string }) => (
  <Panel header='FAQ' key='3'>
    <Space direction='vertical'>
      <Text>
        如果您在使用 idm
        等下载器，请确保网速保持畅通，能够在较快时间内完成下载，否则可能会提示需要认证/登录。如果前面情况发生，请取消下载并从头重新下载。
      </Text>
      <Text>
        网站下载不限速，如果下载很慢请试试<Text strong>切换至流量</Text>。
      </Text>
      <Text>
        点击下载出现
        <Text code>{`{"error":{"code":"activityLimitReached",...`}</Text>
        这种提示，说明服务器负荷达到上限，请等待上面的
        <Text code>retryAfterSeconds</Text>
        秒时间再次点击下载就行了。
      </Text>
    </Space>
  </Panel>
)
