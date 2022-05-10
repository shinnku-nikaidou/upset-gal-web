import ReactDOM from "react-dom";
import "./index.less";
import initChangeTheme, { globalTheme } from "./theme";
import { reportWebVitals } from "./reportWebVitals";
import { GalPageHead } from "./pageHeader";
import Readme from "./readme";
import { SiderMenu } from "./menu";
import { setisPC, storage } from "./config";
import { Layout, Typography, ConfigProvider } from "antd";
import { DirectionType } from "antd/lib/config-provider";
import localforage from "localforage";
const { Content, Footer, Sider } = Layout;
const { Text } = Typography;
import { useState } from 'react'
import { useGlobalTheme } from "./theme"
type GalSiderProps = {};


const main = () => {
  localforage.setDriver(localforage.INDEXEDDB);
  if (storage.hasOwnProperty("mode")) {
    globalTheme.mode = storage.getItem("mode") as "light" | "dark";
  }
  if (storage.hasOwnProperty("direction")) {
    globalTheme.direction = storage.getItem("direction") as DirectionType;
  }
  if (storage.hasOwnProperty("hasBGImage")) {
    // enum: true, false
    globalTheme.hasBGImage = storage.getItem("hasBGImage") === "true";
  }
  ReactDOM.render(<GalSider />, document.getElementById("root"));
  initChangeTheme();
  reportWebVitals();
}

function GalSider(args: GalSiderProps) {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  const exists_Agent = Agents.some((agent) => userAgentInfo.includes(agent)
  );
  console.log(exists_Agent ? "检测到您在使用mobile" : "检测到您在使用pc");
  setisPC(exists_Agent);
  const [collapsed, setCollapsed] = useState(exists_Agent);
  const [theme, setTheme] = useState(globalTheme);
  const color = useGlobalTheme(s => s.color);

  const onCollapse = (collapsed: boolean) => setCollapsed(collapsed);

  return (
    <div style={{ color: color.primaryColor }}>
      <ConfigProvider direction={useGlobalTheme(state => state.direction) as DirectionType}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            theme={theme.mode}
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
              <Text type="secondary"> powered by shinnku </Text>
              <br />
              <Text>
                此版本为 <Text code> beta 2.4</Text> 测试版
              </Text>
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

main();

export default GalSider;
