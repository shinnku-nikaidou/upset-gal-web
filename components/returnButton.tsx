'use client'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@heroui/react'

interface RoundArrowButtonProps {
  ariaLabel?: string
}

export const RoundArrowButton: React.FC<RoundArrowButtonProps> = ({
  ariaLabel,
}) => {
  const onClick = () => {
    const pos = location.href.lastIndexOf('/')

    location.href = location.href.substring(0, pos)
  }

  return (
    <Button
      isIconOnly
      aria-label={ariaLabel}
      className='absolute bottom-12 left-12'
      radius='full'
      size='lg'
      variant='flat'
      onPress={onClick}
    >
      <ArrowLeftOutlined aria-hidden='true' className='h-5 w-5' />
    </Button>
  )
}
