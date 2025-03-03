'use client'

import { useEffect, useRef } from 'react'

interface FileListWrapperProps {
  children: React.ReactNode
}

export const FileListWrapper: React.FC<FileListWrapperProps> = ({
  children,
}) => {
  const node = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const width = window.innerWidth - 90

    if (width < 600) {
      const n = node.current!
      n.style.minWidth = `${width}px`
      n.style.maxWidth = `${width}px`
    }
  })

  return (
    <div className='pr-4 md:min-w-[600px] md:max-w-[960px]' ref={node}>
      {children}
    </div>
  )
}
