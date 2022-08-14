import { Collapse, Space, Typography } from "antd";

const { Panel } = Collapse;
const { Text } = Typography;

export const Intro = () => (
  <Panel
    header="简介"
    key="1"
  >
    <Space direction="vertical">
      <Text>这里收录了大部分的汉化（破解）galgame，没有解压密码。</Text>
      <Text>有在 Windows 电脑上面运行的，krkr 和 ons 是手机版，需要下载专属的模拟器解压再运行。</Text>
    </Space>
  </Panel>
);
