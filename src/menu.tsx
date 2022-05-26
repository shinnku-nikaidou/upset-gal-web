import { useState } from "react";
import ReactDOM from "react-dom";
import { Menu, message, Skeleton } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { globalTheme, Theme, ThemeProviderMenu, useGlobalTheme } from "./theme";
import { FileLi } from "./filelist";
import { RAI } from "./config";
const { SubMenu } = Menu;

let ArrayFile: any[] = [];

const getArrayFile = () => ArrayFile.sort(() => Math.random() - 0.5);

type Item = {
  "@type": "folder" | "file";
  date: string;
  name: string;
  size: string;
};

function get_base64(url: string) {
  let ajaxObj = new XMLHttpRequest();
  ajaxObj.open("get", window.location.href + url);
  ajaxObj.onreadystatechange = () => {
    if (ajaxObj.readyState === 4 && ajaxObj.status === 200) {
      let PageData = JSON.parse(ajaxObj.responseText) as Array<Item>;
      PageData.forEach((v) => {
        ArrayFile.push(v);
      });
    }
  };
  ajaxObj.send();
}
type indexType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 10;

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

const SiderMenu = (props: {}) => {
  const [theme, setTheme] = useState(globalTheme);
  function removeMain() {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("main") as HTMLElement
    );
  }

  function handleClick(e: { key: string }) {
    const key = parseInt(e.key) as indexType;
    ReactDOM.unmountComponentAtNode(
      document.getElementById("main") as HTMLElement
    );
    ReactDOM.render(<Skeleton active />, document.getElementById("main"));
    if (key < 8) {
      type key_map_type = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
      let url: string = RAI + "/" + key_map[key as key_map_type];
      ArrayFile = [];
      get_base64(url);
      setTimeout(() => {
        const hide = message.loading("正在加载中", 0);
        let mainMounttimeId = setInterval(() => {
          if (getArrayFile().length !== 0) {
            removeMain();
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
        case 10: {
          removeMain();
          ReactDOM.render(
            <ThemeProviderMenu />,
            document.getElementById("main")
          );
        }
        default: {
          break;
        }
      }
    }
  }

  return (
    <Menu
      onClick={handleClick}
      defaultSelectedKeys={[]}
      defaultOpenKeys={globalTheme.mobile ? [] : ["sub1", "g2", "sub2"]}
      mode="inline"
      theme={theme.mode}
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
};

export { SiderMenu, getArrayFile };
