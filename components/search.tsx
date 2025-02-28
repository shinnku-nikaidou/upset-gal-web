'use client'

import React, { useState } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Kbd } from '@heroui/kbd'
import { SearchIcon } from './icons'

interface SearchProps {
  // Add any props your component might need here. For example:
  // onSearch?: (term: string) => void; // Callback for when search is performed
  initialSearchTerm?: string // Optional initial search term
}

export const Search: React.FC<SearchProps> = ({
  initialSearchTerm = '' /*onSearch*/,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm)

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      //  if (onSearch) {
      //     onSearch(searchTerm);
      //  } else {
      // Example: Redirect
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`
      //   }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='w-full max-w-2xl'>
        <Input
          aria-label='Search'
          classNames={{
            inputWrapper: 'bg-default-100',
            input: 'text-sm',
          }}
          color='primary'
          endContent={
            <Kbd className='hidden lg:inline-block' keys={['command']}>
              K
            </Kbd>
          }
          labelPlacement='outside'
          placeholder='在此处搜索galgame，搜索不到请换日文原文'
          size='lg'
          startContent={
            <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
          }
          type='search'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default Search // You can still have a default export if needed.
