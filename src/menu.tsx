import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Menu, message, Skeleton } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { getismobile } from "./config";
import { FileLi } from "./filelist";
const { SubMenu } = Menu;

let ArrayFile: any[] = [];

function getArrayFile() {
  ArrayFile.sort(() => Math.random() - 0.5);
  return ArrayFile.sort(() => Math.random() - 0.5);
}

function get_base64(url: string) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("get", window.location.href + url);
  ajaxObj.onreadystatechange = function () {
    if (ajaxObj.readyState === 4 && ajaxObj.status === 200) {
      let responce_text = ajaxObj.responseText;
      let PageRawData = window.atob(responce_text.replace(/&#43;/g, "+"));
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
  };
  ajaxObj.send();
}
type indexType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const key_map = {
  0: "win",
  1: "Android直装",
  2: "krkr",
  3: "ons",
  4: "rpg",
  5: "生肉",
  6: "模拟器",
  7: "Artroid",
};

class SiderMenu extends React.Component {
  handleClick = (e: { key: string }) => {
    const key = parseInt(e.key) as indexType;
    ReactDOM.unmountComponentAtNode(
      document.getElementById("main") as HTMLElement
    );
    ReactDOM.render(<Skeleton active />, document.getElementById("main"));
    if (key < 8) {
      type key_map_type = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
      let url = key_map[key as key_map_type];
      ArrayFile = [];
      get_base64(url);
      setTimeout(() => {
        const hide = message.loading("正在加载中", 0);
        let mainMounttimeId = setInterval(() => {
          if (getArrayFile().length !== 0) {
            ReactDOM.unmountComponentAtNode(
              document.getElementById("main") as HTMLElement
            );
            ReactDOM.render(
              <FileLi url={url} />,
              document.getElementById("main")
            );
            clearInterval(mainMounttimeId);
            setTimeout(hide);
          }
        }, 200);
      });
    } else {
      switch (key) {
        case 8: {
          break;
        }
        case 9: {
          break;
        }
        case 10: {
          break;
        }
        default: {
          break;
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
            return ["sub1", "g2", "sub2"];
          } else {
            return [];
          }
        })()}
        mode="inline"
        theme={"dark"}
      >
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="目录">
          <Menu.ItemGroup key="g1" title="分类">
            <Menu.Item key="0"> windows/pc硬盘 </Menu.Item>
            <Menu.Item key="1"> apk安装包 </Menu.Item>
            <Menu.Item key="2"> kirikiri 2 </Menu.Item>
            <Menu.Item key="3"> ons </Menu.Item>
            <Menu.Item key="4"> rpg </Menu.Item>
            <Menu.Item key="5"> 生肉 </Menu.Item>
            <Menu.Item key="6"> 模拟器 </Menu.Item>
            <Menu.Item key="7"> Artroid </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="设置">
          <Menu.Item key="10"> 主题 </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export { SiderMenu, getArrayFile };
