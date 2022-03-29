import React, { useState, useEffect } from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { Typography, Space } from "antd";
const { Text, Link } = Typography;
const { Panel } = Collapse;

const Readme = () => {
  const [visible, setVisible] = useState(true);
  let VisibleID!: number;
  const componentDidMount = () => VisibleID = setInterval(() => notVisible(), 1000);
  const componentWillUnmount = () => clearInterval(VisibleID);
  const notVisible = () => setVisible(false);
  // useEffect(() => { componentDidMount(); componentWillUnmount(); notVisible() }, [])
  return <div>
    <Collapse
      bordered={false}
      defaultActiveKey={[1, 2, 3]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      className="site-collapse-custom-collapse"
    >
      <Panel header="消息" key="1" className="site-collapse-custom-panel">
        <Space direction="vertical">
          <Text>
            网站服务器被直接爆破，出现不可用问题，目前不能使用自定义背景，请使用了自定义背景的在主题里面点击清除所有设置。
          </Text>
          <Text>
            更新部分为左侧 <Text code>设置:主题</Text> 可以切换成
            <Text keyboard>黑暗模式</Text>, 如果您在使用
            <Text keyboard>公司/学校</Text>
            的机器下载galgame, 可以在主题里选择关闭背景图.
          </Text>
          <Text>现在支持自定义网站的背景</Text>
          <Text>主题部分会自动保存</Text>
        </Space>
      </Panel>
      <Panel
        header="水群，反馈相关"
        key="2"
        className="site-collapse-custom-panel"
      >
        <Space direction="vertical">
          <Text>
            点此加入
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://t.me/upsetGroup"
            >
              telegram群组
            </Link>
            ，有问题请在此反馈。
          </Text>
          <Text>
            此为
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://jq.qq.com/?_wv=1027&k=XixqG2P0"
            >
              qq群（点击此处直接加群）
            </Link>
            ，有问题也可在此反馈。
          </Text>
        </Space>
      </Panel>
      <Panel
        header="下载相关"
        key="3"
        className="site-collapse-custom-panel"
      >
        <Space direction="vertical">
          <Text>
            请确保网速保持畅通，能够在1200s内完成下载,
            否则可能会提示需要认证。
          </Text>
          <Text>
            网站下载不限速, 如果下载不动请试试<Text strong>切换 流量</Text>
          </Text>
        </Space>
      </Panel>
      <Panel
        header="法律与版权"
        key="4"
        className="site-collapse-custom-panel"
      >
        <Space direction="vertical">
          <Text>本资源仅供学习交流使用，请务必于下载后24小时内删除</Text>
          <Text>由于法律原因，日本境内朋友请不要下载。</Text>
          <Text>本站不承担任何为此带来的后果</Text>
          <Text>请自行调查了解并遵守当地的法律规定。</Text>
          <Text>法律を調べて遵守する取り組みは</Text>
          <Text>
            you are still responsible to research and comply with local
            laws.
          </Text>
          <Text>本公告长期有效</Text>
        </Space>
      </Panel>
    </Collapse>
  </div>
}
export default Readme;