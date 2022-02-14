import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import changeTheme, { globalTheme, Theme } from "./theme";
import { reportWebVitals } from "./reportWebVitals";
import { GalPageHead } from "./pageHeader";
import Readme from "./readme";
import { SiderMenu } from "./menu";
import { setisPC } from "./config";
import { Layout, Breadcrumb, Typography } from "antd";
const { Content, Footer, Sider } = Layout;
const { Text } = Typography;

type GalSiderProps = {};

type GalSiderState = {
  collapsed: boolean;
  theme: Theme;
};

class GalSider extends React.Component<GalSiderProps, GalSiderState> {
  constructor(args: GalSiderProps) {
    super(args);
    let userAgentInfo = navigator.userAgent;
    let Agents = [
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
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
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
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
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
              此版本为 <Text code> beta 2.0.13</Text> 测试版
            </Text>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<GalSider />, document.getElementById("root"));
changeTheme();

reportWebVitals();

export default GalSider;
