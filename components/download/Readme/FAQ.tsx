import { Collapse, Space, Typography } from "antd";

const { Panel } = Collapse;
const { Text } = Typography;

export const FAQ = ({ lang }: { lang: string }) => (
  <Panel
    header="FAQ"
    key="3"
  >
    <Space direction="vertical">
      <Text>
        如果您在使用 idm 等下载器，请确保网速保持畅通，能够在较快时间内完成下载，否则可能会提示需要认证/登录。如果前面情况发生，请取消下载并从头重新下载。
      </Text>
      <Text>
        网站下载不限速，如果下载很慢请试试<Text strong>切换至流量</Text>。
      </Text>
      <Text>
        点击下载出现
        <Text code>{`{"error":{"code":"activityLimitReached",...`}</Text>
        这种提示，说明服务器负荷达到上限，请等待上面的
        <Text code>retryAfterSeconds</Text>
        秒时间再次点击下载就行了。（目前不太可能出现这种情况，因为站点采用了负载均衡，多个网盘同时运作能有效负荷每个月高达 160TB 以上的下载流量）
      </Text>
      {/* TODO: These don't seem to work anymore? */}
      <Text>
        关于主题：在
        <Text code>设置：主题</Text>
        可以自由选择切换成
        <Text keyboard>黑暗模式</Text>
        ，您也可以在主题里选择关闭背景图。
      </Text>
      <Text>由于服务器很久以前曾被爆破，现在暂时不支持自定义网站的背景和主题色。</Text>
      <Text>主题部分会自动保存。</Text>
    </Space>
  </Panel>
);
