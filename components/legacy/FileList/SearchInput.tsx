import React, { useCallback, useRef, useState } from 'react'
import { Box, Center, chakra, Flex, LinkBox } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
interface SearchInputProps {
  onSearch: (value: string) => void
  isMobile: boolean
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isMobile }) => {
  const [value, setValue] = useState<string>('')
  const eventRef = useRef<'mouse' | 'keyboard' | null>(null)

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = 'keyboard'
      switch (e.key) {
        case 'Enter': {
          e.preventDefault()
          onSearch(value)
          break
        }
      }
    },
    [onSearch, value],
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  const handleSearch = () => {
    onSearch(value)
  }

  return (
    <Center>
      <Box minW={isMobile ? '' : '520px'} paddingBottom={'20px'}>
        <LinkBox
          as='article'
          borderWidth='1px'
          transition='box-shadow 0.1s ease-out'
          overflow='hidden'
          rounded='24px'
          _dark={{ bg: 'whiteAlpha.50' }}
          _hover={{ shadow: 'md' }}
        >
          <Flex pos='relative' align='stretch'>
            <chakra.input
              aria-autocomplete='list'
              autoComplete='off'
              autoCorrect='off'
              spellCheck='false'
              maxLength={64}
              sx={{
                w: '100%',
                h: '48px',
                pl: '68px',
                fontWeight: 'medium',
                outline: 0,
                bg: 'white',
                '.chakra-ui-dark &': { bg: 'gray.700' },
              }}
              placeholder='推荐主页面搜索更多更全'
              value={value}
              onChange={handleChange}
              onKeyDown={onKeyDown}
            />
            <Center pos='absolute' left={7} h='48px'>
              <a onClick={handleSearch}>
                <SearchIcon color='teal.500' boxSize='20px' />
              </a>
            </Center>
          </Flex>
        </LinkBox>
      </Box>
    </Center>
  )
}

export default SearchInput
