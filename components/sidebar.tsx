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
            className='flex ml-1 justify-self-center md:hidden'
            href={item.link}
            variant='bordered'
          >
            {item.body}
          </Button>
          <Button
            fullWidth
            as={Link}
            className='hidden ml-1 justify-self-center md:flex'
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
