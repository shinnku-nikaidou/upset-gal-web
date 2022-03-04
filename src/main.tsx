import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import initChangeTheme, { globalTheme, Theme } from "./theme";
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

type GalSiderProps = {};

type GalSiderState = {
  collapsed: boolean;
  theme: Theme;
};

function main() {
  localforage.setDriver(localforage.INDEXEDDB);
  if (storage.hasOwnProperty("mode")) {
    const mode = storage.getItem("mode") as "light" | "dark";
    globalTheme.mode = mode;
  }
  if (storage.hasOwnProperty("direction")) {
    const direction = storage.getItem("direction") as DirectionType;
    globalTheme.direction = direction;
  }
  if (storage.hasOwnProperty("hasBGImage")) {
    const hasBGImage = storage.getItem("hasBGImage") as "true" | "false";
    globalTheme.hasBGImage = hasBGImage === "true" ? true : false;
  }
  ReactDOM.render(<GalSider />, document.getElementById("root"));
  initChangeTheme();
  reportWebVitals();
}

class GalSider extends React.Component<GalSiderProps, GalSiderState> {
  constructor(args: GalSiderProps) {
    super(args);
    const userAgentInfo = navigator.userAgent;
    const Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod",
    ];
    let not_exists_Agent = !Agents.some((agent) =>
      userAgentInfo.includes(agent)
    );
    console.log(not_exists_Agent ? "检测到您在使用pc" : "测到您在使用mobile");
    setisPC(not_exists_Agent);
    if (!not_exists_Agent) {
      this.state = {
        collapsed: true,
        theme: globalTheme,
      };
    } else {
      this.state = {
        collapsed: false,
        theme: globalTheme,
      };
    }
  }

  ThemeID!: number;

  componentDidMount() {
    this.ThemeID = setInterval(() => this.changeTheme(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.ThemeID);
  }

  changeTheme() {
    this.setState({
      theme: globalTheme,
    });
    ConfigProvider.config({
      theme: this.state.theme.color,
    });
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <div style={{ color: "var(--ant-primary-color)" }}>
        <ConfigProvider direction={this.state.theme.direction}>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={this.onCollapse}
              theme={this.state.theme.mode}
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
                  此版本为 <Text code> beta 2.2.rc3</Text> 测试版
                </Text>
              </Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
      </div>
    );
  }
}

main();

export default GalSider;
