'use client'

import { Card, CardBody, CardFooter, Link } from '@heroui/react'
import { GlobalOutlined } from '@ant-design/icons'

import { title } from '@/components/primitives'

export default function FilesPage() {
  const list = [
    {
      title: '真红论坛',
      link: 'https://galgame.dev/',
      body: <GlobalOutlined />,
    },

    {
      title: '前win汉化集合',
      link: '/files/win',
      body: <></>,
    },
    {
      title: '新win汉化集合',
      link: '/files/zd',
      body: <></>,
    },
    {
      title: 'apk集合',
      link: '/files/apk',
      body: <></>,
    },
    {
      title: 'ons集合',
      link: '/files/krkr',
      body: <></>,
    },
    {
      title: 'krkr集合',
      link: '/files/krkr',
      body: <></>,
    },
    {
      title: 'galgame工具',
      link: '/files/tools',
      body: <></>,
    },
    {
      title: '生肉硬盘集合',
      link: '/files/raw',
      body: <></>,
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
