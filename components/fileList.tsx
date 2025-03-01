'use client'

import { FileZipOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { Listbox, ListboxItem } from '@heroui/react'

import { Inode } from '@/types'
import { num2size } from '@/algorithm/util'

interface ListboxWrapperProps {
  children: React.ReactNode
}

export const ListboxWrapper: React.FC<ListboxWrapperProps> = ({ children }) => (
  <div className='border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100'>
    {children}
  </div>
)

export const FileList: React.FC<{
  inode: Inode
}> = ({ inode }) => {
  const iconClasses =
    'text-2xl text-default-500 pointer-events-none flex-shrink-0'

  return (
    <ListboxWrapper>
      <Listbox aria-label='User Menu' variant='light'>
        {inode.map((item, index) => (
          <ListboxItem
            key={index}
            className='py-3'
            description={
              item.type == 'file'
                ? `size: ${num2size(item.info.file_size)}`
                : ' '
            }
            startContent={
              item.type == 'file' ? (
                <FileZipOutlined className={iconClasses} />
              ) : item.type == 'folder' ? (
                <FolderOpenOutlined className={iconClasses} />
              ) : null
            }
            textValue={item.name}
          >
            <div>{item.name}</div>
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  )
}
