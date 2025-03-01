'use client'

import { FileZipOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { Listbox, ListboxItem, Pagination } from '@heroui/react'

import { Inode } from '@/types'
import { num2size } from '@/algorithm/util'
import { useCallback, useState } from 'react'
import { generateHref } from '@/algorithm/url'

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
  slug: string[]
}> = ({ inode, slug }) => {
  const [page, setPage] = useState(1)
  const onPaginationChange = useCallback((e: number) => setPage(e), [setPage])
  const iconClasses =
    'text-2xl text-default-500 pointer-events-none flex-shrink-0'

  return (
    <ListboxWrapper>
      <Listbox aria-label='User Menu' variant='light'>
        {inode.slice((page - 1) * 10, page * 10).map((item, index) => (
          <ListboxItem
            key={index}
            className='py-3 max-w-[800px]'
            description={
              item.type == 'file'
                ? `size: ${num2size(item.info.file_size)}`
                : '文件夹'
            }
            href={generateHref(item, slug)}
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
      <Pagination
        initialPage={1}
        size={'md'}
        total={Math.ceil(inode.length / 10)}
        onChange={onPaginationChange}
      />
    </ListboxWrapper>
  )
}
