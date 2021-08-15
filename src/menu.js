import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, message, Skeleton } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { setfeedbackvisible, getismobile } from './config'
import { FileLi } from './filelist'
const { SubMenu } = Menu;

let ArrayFile = [];

function getArrayFile() {
  window.files = ArrayFile
  return ArrayFile
}

function get_base64(url) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open('get', window.location.href + url);
  ajaxObj.onreadystatechange = function () {
    if (ajaxObj.readyState === 4 && ajaxObj.status === 200) {
      let responce_text = ajaxObj.responseText
      let PageRawData = window.atob(responce_text.replace(/&#43;/g, '+'));
      let PageData = JSON.parse(PageRawData);
      var ArrayFloder = [];
      for (let item in PageData) {
        if (item.indexOf("@") === 0) {
          continue;
        }
        if (PageData[item]["@type"] === "file") {
          ArrayFile.push(PageData[item]);
        } else if (PageData[item]["@type"] === "folder") {
          ArrayFloder.push(PageData[item]);
        }
      }
    }
  }
  ajaxObj.send();
}

const key_map = {
  '0': 'win',
  '1': 'windows',
  '2': 'krkr',
  '3': 'ons',
  '4': 'rpg',
  '5': '生肉',
  '6': '模拟器',
  '7': 'pc'
}


class SiderMenu extends React.Component {
  handleClick = e => {
    ReactDOM.unmountComponentAtNode(document.getElementById('main'));
    ReactDOM.render(<Skeleton active />, document.getElementById('main'));
    const success = () => {
      const hide = message.loading('正在加载中', 0);
      setTimeout(hide, 800);
    };
    if (parseInt(e.key) < 8) {
      let url = key_map[e.key]
      ArrayFile = [];
      get_base64(url)
      setTimeout(() => {
        success()
        let mainMounttimeId = setInterval(() => {
          if (getArrayFile().length !== 0) {
            ReactDOM.unmountComponentAtNode(document.getElementById('main'));
            ReactDOM.render(
              <FileLi url={url} />
              , document.getElementById("main")
            )
            clearInterval(mainMounttimeId)
          }
        }, 200)
      })
    } else {
      switch (parseInt(e.key)) {
        case 8: {
          break
        } case 9: {
          setfeedbackvisible(true)
          break
        } case 10: {
          window.location.href = "https://pan.shinnku.com";
          break
        } default: {
          break
        }
      }
    }
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={[]}
        defaultOpenKeys={(() => {
          if (getismobile()) {
            return ['sub1', 'g2', 'sub2'];
          } else {
            return []
          }
        })()}
        mode="inline"
        theme={"dark"}
      >
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="目录">
          <Menu.ItemGroup key="g1" title="分类">
            <Menu.Item key="0"> windows </Menu.Item>
            <Menu.Item key="2"> kirikiri 2 </Menu.Item>
            <Menu.Item key="3"> ons </Menu.Item>
            <Menu.Item key="4"> rpg </Menu.Item>
            <Menu.Item key="5"> 生肉 </Menu.Item>
            <Menu.Item key="6"> 模拟器 </Menu.Item>
            {/* <Menu.Item key="7"> pc(by忧郁的弟弟(loli)) </Menu.Item> */}
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="设置">
          <Menu.Item key="8"> 主题 </Menu.Item>
          <Menu.Item key="9"> 反馈 </Menu.Item>
          <Menu.Item key="10"> 上传 </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export { SiderMenu, getArrayFile }