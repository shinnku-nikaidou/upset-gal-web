import { useCallback } from "react";
import { Menu } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { TKey } from "../../data/interfaces";

import { getMobile } from "../theme";

const { SubMenu, ItemGroup, Item } = Menu;

interface ISideMenuProps {
  setKey: (key: TKey) => void;
}

export const SideMenu = ({
  setKey,
}: ISideMenuProps) => {
  const onClick = useCallback((e: { key: string }) => {
    setKey(e.key as TKey);
  }, [setKey]);

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={[]}
      defaultOpenKeys={getMobile() ? [] : ["sub1", "sub2"]}
      mode="inline"
    >
      <SubMenu
        key="sub1"
        icon={<AppstoreOutlined />}
        title="目录"
      >
        <ItemGroup key="g1" title="分类">
          <Item key="0">Windows / PC 硬盘</Item>
          <Item key="1">apk 安装包</Item>
          <Item key="2">kirikiri 2</Item>
          <Item key="3">ons</Item>
          <Item key="4">rpg</Item>
          <Item key="5">生肉</Item>
          <Item key="6">模拟器</Item>
          <Item key="7">Artroid</Item>
        </ItemGroup>
      </SubMenu>
      <SubMenu
        key="sub2"
        icon={<SettingOutlined />}
        title="设置"
      >
        <Item key="10">主题</Item>
      </SubMenu>
    </Menu>
  );
};
