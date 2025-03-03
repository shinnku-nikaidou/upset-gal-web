'use client'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Link } from '@heroui/react'
import { useRouter } from 'next/navigation'

interface RoundArrowButtonProps {
  ariaLabel?: string
}

export const RoundArrowButton: React.FC<RoundArrowButtonProps> = ({
  ariaLabel,
}) => {
  const router = useRouter()

  return (
    <Button
      isIconOnly
      aria-label={ariaLabel}
      as={Link}
      className='absolute bottom-12 left-6'
      radius='full'
      size='lg'
      variant='flat'
      onPress={() => router.back()}
    >
      <ArrowLeftOutlined aria-hidden='true' className='w-5 h-5' />
    </Button>
  )
}
