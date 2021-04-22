import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, message } from 'antd';
import { ArrayFile, get_base64 } from './list'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { FileLi } from './fileli'
const { SubMenu } = Menu;

const success = () => {
  const hide = message.loading('正在加载中', 0);
  setTimeout(hide, 1600);
};

class SiderMenu extends React.Component {
  handleClick = e => {
    const key_map = {
      '1': 'win',
      '2': 'krkr',
      '3': 'ons',
      '4': 'rpg',
      '5': '生肉',
      '6': '模拟器',
    }
    console.log('click menu', e);
    if (parseInt(e.key) > 6) {
      return
    }
    get_base64(key_map[e.key])
    success()
    setTimeout(() => {
      ReactDOM.render(
        <FileLi files={ArrayFile} url={key_map[e.key]} />
        , document.getElementById("main")
      )
    }, 1400)
  };
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={[]}
        defaultOpenKeys={['sub1', 'g2', 'sub2']}
        mode="inline"
        theme="dark"
      >
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="目录">
          <Menu.ItemGroup key="g1" title="分类">
            <Menu.Item key="1"> windows </Menu.Item>
            <Menu.Item key="2"> kirikiri 2 </Menu.Item>
            <Menu.Item key="3"> ons </Menu.Item>
            <Menu.Item key="4"> rpg </Menu.Item>
            <Menu.Item key="5"> 生肉 </Menu.Item>
            <Menu.Item key="6"> 模拟器 </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="设置">
          <Menu.Item key="8"> 主题 </Menu.Item>
          <Menu.Item key="9"> 账户 </Menu.Item>
          <Menu.Item key="10"> 反馈 </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export { SiderMenu }