'use client'

import { Button } from '@heroui/button'
import { Link } from '@heroui/link'

import { IndexListForSlog } from '@/config/indexList'

export const Sidebar = () => {
  return (
    <div className='flex flex-col gap-4'>
      {IndexListForSlog.map((item, index) => (
        <div key={index}>
          <Button
            isIconOnly
            as={Link}
            className='flex md:hidden'
            href={item.link}
            variant='bordered'
          >
            {item.body}
          </Button>
          <Button
            fullWidth
            as={Link}
            className='justify-start hidden md:flex'
            href={item.link}
            variant='bordered'
          >
            {item.body}
            <span>{item.title}</span>
          </Button>
        </div>
      ))}
    </div>
  )
}
