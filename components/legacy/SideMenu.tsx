import { useCallback } from 'react'
import { Menu } from 'antd/lib'
import {
  AndroidOutlined,
  AppstoreAddOutlined,
  CodeOutlined,
  LaptopOutlined,
  MobileOutlined,
  SettingOutlined,
  WindowsOutlined,
} from '@ant-design/icons'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import t from '@lang'
import { KRKROutlined } from '../icons/kirikiri'
import { TKey } from '@/types/onedrivelegacy'

const { SubMenu, Item } = Menu

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
      defaultOpenKeys={isMobile ? [] : ['sub1', 'sub2', 'sub3', 'sub4']}
      mode='inline'
    >
      <SubMenu key='sub1' icon={<LaptopOutlined />} title={t('Laptop', lang)}>
        <Item key='win'>
          <WindowsOutlined /> {t('Windows', lang)}
        </Item>
        <Item key='rpg'>rpg</Item>
      </SubMenu>
      <SubMenu key='sub2' icon={<MobileOutlined />} title={t('Mobile', lang)}>
        <Item key='kr'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <KRKROutlined width={12} height={12} />
            <p style={{ marginLeft: '4px' }}>kirikiri 2</p>
          </div>
        </Item>
        <Item key='apk'>
          <AndroidOutlined />
          {t('APK', lang)}
        </Item>
        <Item key='ons'>ons</Item>
        <Item key='artroid'>Artroid</Item>
      </SubMenu>
      <SubMenu
        key='sub3'
        icon={<AppstoreAddOutlined />}
        title={t('Software', lang)}
      >
        <Item key='simulate'>
          <SportsEsportsOutlinedIcon style={{ width: 16 }} />{' '}
          {t('Simulator', lang)}
        </Item>
        <Item key='soft'>
          <CodeOutlined /> {t('Tools', lang)}
        </Item>
      </SubMenu>
      <SubMenu key='sub4' icon={<SettingOutlined />} title={t('Setting', lang)}>
        <Item key='10'>{t('Theme', lang)}</Item>
      </SubMenu>
    </Menu>
  )
}
