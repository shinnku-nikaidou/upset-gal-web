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
      aria-label={ariaLabel}
      className='absolute bottom-12 left-12 p-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
      onPress={onClick}
    >
      <ArrowLeftOutlined aria-hidden='true' className='h-5 w-5' />
    </Button>
  )
}
