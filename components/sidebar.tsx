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
    <div className='grid grid-cols-4 gap-4 sm:grid-cols-1 justify-items-center'>
      {IndexListForSlog.map((item, index) => (
        <Button
          key={index}
          as={Link}
          className='sm:w-full min-w-0'
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
