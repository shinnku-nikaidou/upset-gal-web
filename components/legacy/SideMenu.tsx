import { useCallback } from 'react'
import {
  AndroidOutlined,
  CodeOutlined,
  GlobalOutlined,
  SettingOutlined,
  WindowsOutlined,
} from '@ant-design/icons'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import t from '@lang'
import { KRKROutlined } from '../icons/kirikiri'
import { TKey } from '@/types/onedrivelegacy'
import { Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { Button, Link } from '@nextui-org/react'
import { ONSOutlined } from '../icons/ons'

interface ISideMenuProps {
  setKey: (key: TKey) => void
  isMobile: boolean
  lang: string
}

export const SideMenu = ({ setKey, isMobile, lang }: ISideMenuProps) => {
  const onClick = useCallback(
    (key: TKey) => {
      setKey(key)
    },
    [setKey],
  )

  if (isMobile) {
    return (
      <Flex direction='column' gap='2vh'>
        <Button
          variant='bordered'
          isIconOnly
          as={Link}
          href={'https://galgame.dev/'}
          isExternal
        >
          <GlobalOutlined />
        </Button>
        <Button isIconOnly variant='bordered' onClick={() => onClick('win')}>
          <WindowsOutlined />
        </Button>
        <Button isIconOnly variant='bordered' onClick={() => onClick('kr')}>
          <KRKROutlined width={12} height={12} />
        </Button>
        <Button isIconOnly variant='bordered' onClick={() => onClick('apk')}>
          <AndroidOutlined />
        </Button>
        <Button isIconOnly variant='bordered' onClick={() => onClick('ons')}>
          <ONSOutlined width={20} height={20} />
        </Button>
        <Button
          isIconOnly
          variant='bordered'
          onClick={() => onClick('artroid')}
        >
          <Image
            src='/assets/icon/tyranor.png'
            alt={'artroid tyranor'}
            width={24}
            height={24}
            loading='lazy'
          ></Image>
        </Button>
        <Button
          isIconOnly
          variant='bordered'
          onClick={() => onClick('simulate')}
        >
          <SportsEsportsOutlinedIcon style={{ width: 16 }} />
        </Button>
        <Button isIconOnly variant='bordered' onClick={() => onClick('soft')}>
          <CodeOutlined />
        </Button>
        <Button isIconOnly variant='bordered' onClick={() => onClick('10')}>
          <SettingOutlined />
        </Button>
      </Flex>
    )
  } else {
    return (
      <Flex direction='column' gap='2vh'>
        <Button
          variant='bordered'
          key='bbs'
          as={Link}
          href={'https://galgame.dev/'}
          isExternal
        >
          <GlobalOutlined /> 网站论坛
        </Button>
        <Button variant='bordered' onClick={() => onClick('win')}>
          <WindowsOutlined /> {t('Windows', lang)}
        </Button>
        <Button variant='bordered' onClick={() => onClick('kr')}>
          <KRKROutlined width={12} height={12} /> kirikiri 2
        </Button>
        <Button variant='bordered' onClick={() => onClick('apk')}>
          <AndroidOutlined /> {t('APK', lang)}
        </Button>
        <Button variant='bordered' onClick={() => onClick('ons')}>
          <ONSOutlined width={20} height={20} /> ONScripter
        </Button>
        <Button variant='bordered' onClick={() => onClick('artroid')}>
          <Image
            src='/assets/icon/tyranor.png'
            alt={'artroid tyranor'}
            width={24}
            height={24}
            loading='lazy'
          ></Image>{' '}
          tyranor
        </Button>
        <Button variant='bordered' onClick={() => onClick('simulate')}>
          <SportsEsportsOutlinedIcon style={{ width: 16 }} />{' '}
          {t('Simulator', lang)}
        </Button>
        <Button variant='bordered' onClick={() => onClick('soft')}>
          <CodeOutlined /> {t('Tools', lang)}
        </Button>
        <Button variant='bordered' onClick={() => onClick('10')}>
          <SettingOutlined /> {t('Setting', lang)}
        </Button>
      </Flex>
    )
  }
}
