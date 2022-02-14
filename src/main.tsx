import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { reportWebVitals } from "./reportWebVitals";
import { GalPageHead } from "./pageHeader";
import Readme from "./readme";
import { SiderMenu } from "./menu";
import { setismobile } from "./config";
import { Layout, Breadcrumb, Typography } from "antd";
const { Content, Footer, Sider } = Layout;
const { Text } = Typography;

type GalSiderProps = {};

type GalSiderState = {
  category: any;
  collapsed: boolean;
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
    let not_exists_userAgent = !Agents.some(agent => userAgentInfo.includes(agent));
    console.log(not_exists_userAgent ? "检测到您在使用pc" : "测到您在使用mobile");
    setismobile(not_exists_userAgent);
    if (!not_exists_userAgent) {
      this.state = {
        collapsed: true,
        category: "",
      };
    } else {
      this.state = {
        collapsed: false,
        category: "",
      };
    }
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <SiderMenu />
        </Sider>
        <Layout className="site-layout">
          <GalPageHead />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{this.state.category}</Breadcrumb.Item>
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
              此版本为 <Text code>1.5.1</Text> 正式版
            </Text>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<GalSider />, document.getElementById("root"));

reportWebVitals();
