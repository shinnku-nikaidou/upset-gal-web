'use client'

import Link from 'next/link'
import { Card, CardBody, CardFooter } from '@heroui/react'

import { title } from '@/components/primitives'
import { IndexList } from '@/config/indexList'

export default function FilesPage() {
  return (
    <div className='items-center text-center'>
      <h1 className={title()}>全部游戏</h1>
      <div className='grid grid-cols-2 gap-4 pt-10 mt-8 sm:grid-cols-4'>
        {IndexList.map((item, index) => (
          <Card
            key={index}
            isPressable
            as={Link}
            className='w-full'
            href={item.link}
            shadow='sm'
          >
            <CardBody className='flex items-center justify-center h-16 p-0 overflow-visible'>
              {item.body}
            </CardBody>
            <CardFooter className='justify-center text-small'>
              <b>{item.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
