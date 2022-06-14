import "./index.less";
import initChangeTheme, { globalTheme } from "./theme";
import { GalPageHead } from "./pageHeader";
import Readme from "./readme";
import { SiderMenu } from "./menu";
import { setisPC, storage, version } from "./config";
import { Layout, Typography, ConfigProvider } from "antd";
import { DirectionType } from "antd/lib/config-provider";
const { Content, Footer, Sider } = Layout;
const { Text } = Typography;
import { useState } from "react";
import { useGlobalTheme } from "./theme";
import Link from "antd/lib/typography/Link";
import ReactDOM from "react-dom";
type GalSiderProps = {};

const userAgentInfo = navigator.userAgent;
const Agents = [
  "Android",
  "iPhone",
  "SymbianOS",
  "Windows Phone",
  "iPad",
  "iPod",
];
const exists_Agent = Agents.some((agent) => userAgentInfo.includes(agent));

setisPC(exists_Agent);

const main = () => {
  if (storage.hasOwnProperty("direction")) {
    globalTheme.direction = storage.getItem("direction") as DirectionType;
  }
  if (storage.hasOwnProperty("hasBGImage")) {
    globalTheme.hasBGImage = storage.getItem("hasBGImage") === "true";
  }
  ReactDOM.render(<GalSider />, document.getElementById("root"));
  initChangeTheme();
};

const GalSider = (args: GalSiderProps) => {
  const [collapsed, setCollapsed] = useState(exists_Agent);

  const onCollapse = (collapsed: boolean) => setCollapsed(collapsed);

  return (
    <ConfigProvider
      direction={useGlobalTheme((state) => state.direction) as DirectionType}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          theme={"light"}
          // theme={theme.mode}
        >
          <div className="logo" />
          <SiderMenu />
        </Sider>
        <Layout className="site-layout">
          <GalPageHead />
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div id="main"></div>
              <div id="readme">
                <Readme />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <Text type="secondary">
              powered by shinnku, 注：源码展示出来仅供参考
              <Link
                target="_blank"
                href="https://github.com/shinnku-nikaidou/upset-gal-web"
              ></Link>
            </Text>
            <br />
            <Text>
              此版本为 <Text code> {version} </Text> 正式版
            </Text>
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

main();
