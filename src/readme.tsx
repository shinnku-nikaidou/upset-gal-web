import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { Typography, Space } from "antd";
const { Text, Link } = Typography;
const { Panel } = Collapse;

const Readme = () => {
  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={[1, 2, 3]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        <Panel header="简介" key="1" className="site-collapse-custom-panel">
          <Space direction="vertical">
            <Text>这里收录了大部分的汉化（破解）galgame，没有解压密码。</Text>
            <Text>
              有在windows电脑上面运行的，krkr和ons是手机版，需要下载专属的模拟器解压再运行。
            </Text>
          </Space>
        </Panel>
        <Panel header="反馈相关" key="2" className="site-collapse-custom-panel">
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
        <Panel header="FAQ" key="3" className="site-collapse-custom-panel">
          <Space direction="vertical">
            <Text>
              如果您在使用idm等下载器，请确保网速保持畅通，能够在较快时间内完成下载,
              否则可能会提示需要认证/登录。如果前面情况发生，请取消下载并从头重新下载。
            </Text>
            <Text>
              网站下载不限速, 如果下载不动请试试<Text strong>切换 流量</Text>
              。如果您最开始速度快然后慢慢降速到几十kb/s，请打电话投诉当地网络运营商。
            </Text>
            <Text>
              点击下载出现：
              <Text code>
                {" "}
                {`{"error":{"code":"activityLimitReached",...`}{" "}
              </Text>{" "}
              这种提示，说明服务器负荷达到上限，请等待上面的
              <Text code> retryAfterSeconds </Text>秒时间再次点击下载就行了。
            </Text>
            <Text>
              关于主题： 在 <Text code>设置:主题</Text> 可以自由选择切换成
              <Text keyboard>黑暗模式</Text>, 您也可以在主题里选择关闭背景图.
            </Text>
            <Text>现在暂时不支持自定义网站的背景和主题色</Text>
            <Text>主题部分会自动保存</Text>
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
              you are still responsible to research and comply with local laws.
            </Text>
            <Text>本公告长期有效</Text>
          </Space>
        </Panel>
      </Collapse>
    </div>
  );
};
export default Readme;
