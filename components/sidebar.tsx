'use client'

import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { useEffect, useState } from 'react'

import { IndexListForSlog } from '@/config/indexList'

export const Sidebar = () => {
  const [breakpoint, setBreakpoint] = useState(true)

  useEffect(() => {
    const width = window.innerWidth

    if (width > 768) {
      setBreakpoint(false)
    }
  })

  return (
    <div className='flex flex-col gap-4 row-start-2 row-end-3 sm:row-start-1 sm:row-end-2'>
      {IndexListForSlog.map((item, index) => (
        <Button
          key={index}
          as={Link}
          className='sm:w-full'
          href={item.link}
          isIconOnly={breakpoint}
          variant='bordered'
        >
          {item.body}
          <div className='justify-self-center hidden md:flex ml-1'>
            {item.title}
          </div>
        </Button>
      ))}
    </div>
  )
}
