import React, { useState } from 'react'
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'

interface SearchInputProps {
  onSearch: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [value, setValue] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  const handleSearch = () => {
    onSearch(value)
  }

  return (
    <InputGroup size='lg'>
      <Input
        pr='4.5rem'
        placeholder='Input search text'
        value={value}
        onChange={handleChange}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleSearch}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default SearchInput
