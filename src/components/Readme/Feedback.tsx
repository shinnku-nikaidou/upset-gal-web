import { Collapse, Space, Typography } from "antd";

const { Panel } = Collapse;
const { Text, Link } = Typography;

export const Feedback = () => (
  <Panel
    header="反馈相关"
    key="2"
  >
    <Space direction="vertical">
      <Text>
        <span>点此加入 </span>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://t.me/upsetGroup"
        >
          telegram 群组
        </Link>
        <span>，有问题请在此反馈。</span>
      </Text>
      <Text>
        <span>此为 </span>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://jq.qq.com/?_wv=1027&k=XixqG2P0"
        >
          qq 群（点击此处直接加群）
        </Link>
        <span>，有问题也可在此反馈。</span>
      </Text>
    </Space>
  </Panel>
);
