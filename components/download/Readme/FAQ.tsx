import { Collapse, Space, Typography } from 'antd'

const { Panel } = Collapse
const { Text } = Typography

export const FAQ = (props: { lang: string }) => (
  <Panel header='FAQ' key='3'>
    <Space direction='vertical'>
      <Text>
        如果您在使用 idm
        等多线程下载器，请确保网速保持畅通，能够在较快时间内完成下载，否则可能会提示需要认证/登录。如果前面情况发生，请取消下载并从头重新下载。
      </Text>
      <Text>
        网站下载不限速，如果下载很慢请说明被运营商拦截限制了，试试<Text strong>切换至流量/使用上面👆的机场开启vpn下载</Text>。
      </Text>
      <Text>这里接受加密货币赞助 usdt/eth 投喂喵，地址是 shinnku.eth 喵（目前已有 1 人捐赠）</Text>
    </Space>
  </Panel>
)
