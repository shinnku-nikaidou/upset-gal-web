import { useCallback } from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { TKey } from '../../const/interfaces'
import t from '../../utils/languages'

const { SubMenu, ItemGroup, Item } = Menu

interface ISideMenuProps {
  setKey: (key: TKey) => void
  isMobile: boolean
  lang: string
}

export const SideMenu = ({ setKey, isMobile, lang }: ISideMenuProps) => {
  const onClick = useCallback(
    (e: { key: string }) => {
      setKey(e.key as TKey)
    },
    [setKey],
  )

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={[]}
      defaultOpenKeys={isMobile ? [] : ['sub1', 'sub2']}
      mode='inline'
    >
      <SubMenu key='sub1' icon={<AppstoreOutlined />} title={t('Menu', lang)}>
        <ItemGroup key='g1' title={t('Classify', lang)}>
          <Item key='0'>Windows</Item>
          <Item key='1'>{t('APK', lang)}</Item>
          <Item key='2'>kirikiri 2</Item>
          <Item key='3'>ons</Item>
          <Item key='4'>rpg</Item>
          <Item key='5'>{t('生肉', lang)}</Item>
          <Item key='6'>{t('Simulator', lang)}</Item>
          <Item key='7'>Artroid</Item>
        </ItemGroup>
      </SubMenu>
      <SubMenu key='sub2' icon={<SettingOutlined />} title={t('Setting', lang)}>
        <Item key='10'>{t('Theme', lang)}</Item>
      </SubMenu>
    </Menu>
  )
}
