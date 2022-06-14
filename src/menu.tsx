import { useState } from "react";
import ReactDOM from "react-dom";
import { Menu, message, Skeleton } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { FileLi } from "./filelist";
import { get_key, key_map, RAI, set_key } from "./config";
import { globalTheme, ThemeProviderMenu } from "./theme";
import { indexType, Item, key_map_type } from "./type";
const { SubMenu } = Menu;

let ArrayFile: Item[] = [];

const getArrayFile = () => ArrayFile.sort(() => Math.random() - 0.5);

function get_base64(url: string) {
  ArrayFile = [];
  let ajaxObj = new XMLHttpRequest();
  ajaxObj.open("get", window.location.href + url);
  ajaxObj.onreadystatechange = () => {
    if (ajaxObj.readyState === 4 && ajaxObj.status === 200) {
      ArrayFile = JSON.parse(ajaxObj.responseText) as Array<Item>;
    }
  };
  ajaxObj.send();
}

function removeMain() {
  ReactDOM.unmountComponentAtNode(
    document.getElementById("main") as HTMLElement
  );
}

export function changeFileLi(url: string) {
  get_base64(url);
  setTimeout(() => {
    const hide = message.loading("正在加载中", 0);
    let mainMounttimeId = setInterval(() => {
      if (getArrayFile().length !== 0) {
        removeMain();
        ReactDOM.render(<FileLi url={url} />, document.getElementById("main"));
        clearInterval(mainMounttimeId);
        setTimeout(hide);
      }
    }, 200);
  });
}

const SiderMenu = () => {
  const [theme, setTheme] = useState(globalTheme);

  function handleClick(e: { key: string }) {
    set_key(parseInt(e.key) as indexType);
    ReactDOM.unmountComponentAtNode(
      document.getElementById("main") as HTMLElement
    );
    ReactDOM.render(<Skeleton active />, document.getElementById("main"));
    if (get_key() < 8) {
      let url: string = RAI + "/" + key_map[get_key() as key_map_type];
      changeFileLi(url);
    } else {
      switch (get_key()) {
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
      defaultOpenKeys={globalTheme.mobile ? ["g2"] : ["sub1", "g2", "sub2"]}
      mode="inline"
      // theme={theme.mode}
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
