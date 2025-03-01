'use client'

import { Card, CardBody, CardFooter, Link } from '@heroui/react'

import { title } from '@/components/primitives'
import { IndexList } from '@/config/indexList'

export default function FilesPage() {
  return (
    <div>
      <h1 className={title()}>全部游戏</h1>
      <div className='gap-4 grid grid-cols-2 sm:grid-cols-2 mt-8'>
        {IndexList.map((item, index) => (
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
