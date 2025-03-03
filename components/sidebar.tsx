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

  return breakpoint ? (
    <div className='flex flex-col gap-[3vh]'>
      {IndexListForSlog.map((item, index) => (
        <Button
          key={index}
          isIconOnly
          as={Link}
          className='grid'
          href={item.link}
          variant='bordered'
        >
          {item.body}
        </Button>
      ))}
    </div>
  ) : (
    <div className='flex flex-col gap-[3vh]'>
      {IndexListForSlog.map((item, index) => (
        <Button
          key={index}
          as={Link}
          className='grid grid-cols-[auto_1fr]'
          href={item.link}
          variant='bordered'
        >
          <div>{item.body}</div>
          <div className='justify-self-center hidden md:flex'>{item.title}</div>
        </Button>
      ))}
    </div>
  )
}
