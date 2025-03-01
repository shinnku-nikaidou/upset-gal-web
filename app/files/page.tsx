'use client'

import { Card, CardBody, CardFooter, Link } from '@heroui/react'
import {
  AndroidOutlined,
  CodeOutlined,
  GlobalOutlined,
  WindowsOutlined,
} from '@ant-design/icons'
import Image from 'next/image'

import { title } from '@/components/primitives'
import { KRKROutlined, ONSOutlined } from '@/components/galgame-icons'

export default function FilesPage() {
  const list = [
    {
      title: '真红论坛',
      link: 'https://galgame.dev/',
      body: <GlobalOutlined className='my-icon-large' />,
    },
    {
      title: '前win汉化集合',
      link: '/files/shinnku/0/win',
      body: <WindowsOutlined className='my-icon-large' />,
    },
    {
      title: '新win汉化集合',
      link: '/files/shinnku/zd',
      body: <WindowsOutlined className='my-icon-large' />,
    },
    {
      title: 'apk集合',
      link: '/files/shinnku/0/apk',
      body: <AndroidOutlined className='my-icon-large' />,
    },
    {
      title: 'ons集合',
      link: '/files/shinnku/0/ons',
      body: <ONSOutlined height={60} width={60} />,
    },
    {
      title: 'krkr集合',
      link: '/files/shinnku/0/krkr',
      body: <KRKROutlined height={36} width={36} />,
    },
    {
      title: 'galgame工具',
      link: '/files/shinnku/0/tools',
      body: <CodeOutlined className='my-icon-large' />,
    },
    {
      title: '生肉硬盘集合',
      link: '/files/galgame0',
      body: <Image alt={'japan'} height={40} src={'/japan.svg'} width={40} />,
    },
  ]

  return (
    <div>
      <h1 className={title()}>全部游戏</h1>
      <div className='gap-4 grid grid-cols-2 sm:grid-cols-2 mt-8'>
        {list.map((item, index) => (
          <Link key={index} href={item.link}>
            <Card isPressable className='w-full' shadow='sm'>
              <CardBody className='overflow-visible p-0 flex justify-center items-center h-16'>
                {item.body}
              </CardBody>
              <CardFooter className='text-small justify-center'>
                <b>{item.title}</b>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
