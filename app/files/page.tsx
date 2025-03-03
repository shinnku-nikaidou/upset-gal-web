'use client'

import { Card, CardBody, CardFooter } from '@heroui/react'

import { title } from '@/components/primitives'
import { IndexList } from '@/config/indexList'

export default function FilesPage() {
  const generatePress = (link: string) => () => {
    window.location.href = link
  }

  return (
    <div className='items-center text-center'>
      <h1 className={title()}>全部游戏</h1>
      <div className='gap-4 grid grid-cols-2 sm:grid-cols-4 mt-8 pt-10'>
        {IndexList.map((item, index) => (
          <Card
            key={index}
            isPressable
            className='w-full'
            shadow='sm'
            onPress={generatePress(item.link)}
          >
            <CardBody className='overflow-visible p-0 flex justify-center items-center h-16'>
              {item.body}
            </CardBody>
            <CardFooter className='text-small justify-center'>
              <b>{item.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
