import React, { useState } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'

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
          fullWidth
          isClearable
          aria-label='Search'
          color='primary'
          //   contentLeft={<SearchIcon className='text-gray-400' />}
          //   contentRight={
          //     searchTerm && (
          //       <Button auto flat color='error' onClick={() => setSearchTerm('')}>
          //         X
          //       </Button>
          //     )
          //   }
          placeholder='Search Google or type a URL'
          size='lg'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default Search // You can still have a default export if needed.
