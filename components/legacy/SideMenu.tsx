import { useCallback } from 'react'
import { Menu } from 'antd'
import Image from 'next/image'
import {
  AndroidOutlined,
  LaptopOutlined,
  SettingOutlined,
  WindowsOutlined,
} from '@ant-design/icons'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import { TKey } from '@/types/theme'
import t from '@lang'

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
        <Item key='0'>
          <WindowsOutlined /> {t('Windows', lang)}
        </Item>
        <Item key='4'>
          <SportsEsportsOutlinedIcon />
          rpg
        </Item>
        <Item key='5'>{t('生肉', lang)}</Item>
      </SubMenu>
      <SubMenu key='sub2' icon={<LaptopOutlined />} title={t('Mobile', lang)}>
        <Item key='2'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src='/assets/icon/kirikiroid2.jpg'
              alt='kirikiri'
              width={12}
              height={12}
            ></Image>
            <p style={{ marginLeft: '4px' }}>kirikiri 2</p>
          </div>
        </Item>
        <Item key='1'>
          <AndroidOutlined />
          {t('APK', lang)}
        </Item>
        <Item key='3'>ons</Item>
        <Item key='7'>Artroid</Item>
      </SubMenu>
      <SubMenu key='sub3' icon={<SettingOutlined />} title={t('Setting', lang)}>
        <Item key='6'>{t('Simulator', lang)}</Item>
      </SubMenu>
      <SubMenu key='sub4' icon={<SettingOutlined />} title={t('Setting', lang)}>
        <Item key='10'>{t('Theme', lang)}</Item>
      </SubMenu>
    </Menu>
  )
}
