import { Button } from '@heroui/button'
import { Link } from '@heroui/link'

import { IndexListForSlog } from '@/config/indexList'

export const Sidebar = () => {
  return (
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
          <div className='justify-self-center hidden sm:flex'>{item.title}</div>
        </Button>
      ))}
    </div>
  )
}
