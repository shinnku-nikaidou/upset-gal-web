import { Collapse, Space, Typography } from "antd";

const { Panel } = Collapse;
const { Text } = Typography;

export const Notice = ({ lang }: { lang: string }) => (
  <Panel
    header="法律与版权"
    key="4"
  >
    <Space direction="vertical">
      <Text>本资源仅供学习交流使用，请务必于下载后 24 小时内删除。</Text>
      <Text>由于法律原因，日本境内朋友请不要下载。</Text>
      <Text>本站不承担任何为此带来的后果。</Text>
      <Text>请自行调查了解并遵守当地的法律规定。</Text>
      <Text>法律を調べて遵守する取り組みは。</Text>
      <Text>you are still responsible to research and comply with local laws.</Text>
      <Text>本公告长期有效。</Text>
    </Space>
  </Panel>
);
