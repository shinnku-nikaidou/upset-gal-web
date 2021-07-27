import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GalPageHead } from './pageHeader'
import { Readme } from './readme'
import { SiderMenu } from './menu'
import { FeedBack } from './feedback'
import { galgame } from "./galgame"
import { setismobile } from "./config"
import 'antd/dist/antd.css';
import { Layout, Breadcrumb, Typography } from 'antd';
const { Content, Footer, Sider } = Layout;
const { Text } = Typography;

window.galgame = galgame

class SiderDemo extends React.Component {
  constructor(...args) {
    super(...args)
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    console.log(flag ? "mobile" : "pc")
    setismobile(flag)
    if (!flag) {
      this.state = {
        collapsed: true,
        category: "",
      }
    } else {
      this.state = {
        collapsed: false,
        category: "",
      }
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <SiderMenu />
        </Sider>
        <Layout className="site-layout">
          <GalPageHead />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{this.state.category}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div id="main"></div>
              <div id="readme"><Readme /></div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Text type="secondary"> powered by shinnku </Text>
            <br />
            <Text>此版本为 <Text code>1.0.1</Text> 正式版 </Text>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(
  <SiderDemo />,
  document.getElementById('root'),
);

ReactDOM.render(<FeedBack />, document.getElementById('feedback'));

reportWebVitals();

(() => {
  if (window.location.href !== "https://shinnku.com/"){
    window.location.href = "https://shinnku.com/";
  }
})()
