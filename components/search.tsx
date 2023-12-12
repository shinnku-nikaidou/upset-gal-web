import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  LinkBox,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  useEventListener,
  useUpdateEffect,
} from '@chakra-ui/react'
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import MultiRef from 'react-multi-ref'
import { NewFrontItem } from '@/types'
import Link from 'next/link'

const Search = (props: { isMobile: boolean; lang: string }) => {
  const [trueQuery, setTrueQuery] = useState('')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [shouldCloseModal, setShouldCloseModal] = useState(true)
  const menu = useDisclosure()
  const modal = useDisclosure()
  const [menuNodes] = useState(() => new MultiRef<number, HTMLElement>())
  const menuRef = useRef<HTMLDivElement>(null)
  const eventRef = useRef<'mouse' | 'keyboard' | null>(null)

  const [results, setResults] = useState<Array<NewFrontItem>>([])

  useEventListener('keydown', (event) => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'
    if (event?.key?.toLowerCase() === 'k' && event[hotkey]) {
      event.preventDefault()
      modal.isOpen ? modal.onClose() : modal.onOpen()
    }
  })

  useEffect(() => {
    if (modal.isOpen && query.length > 0) {
      setQuery('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.isOpen])

  useEffect(() => {
    async function foobar() {
      if (trueQuery.length < 1) return []
      console.log(trueQuery)

      fetch(window.location.origin + '/api/search?q=' + trueQuery)
        .then((res) => res.json())
        .then((res) => {
          setResults(res as Array<NewFrontItem>)
        })
    }
    foobar()
  }, [trueQuery])

  const open = menu.isOpen && results.length > 0

  const item_sx = {
    display: 'flex',
    alignItems: 'center',
    minH: 12,
    mt: 2,
    px: 4,
    py: 2,
    rounded: 'lg',
    bg: 'gray.100',
    '.chakra-ui-dark &': { bg: 'gray.600' },
    _selected: {
      bg: 'teal.400',
      color: 'white',
      mark: {
        color: 'white',
        textDecoration: 'underline',
      },
    },
  }

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = 'keyboard'
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          if (active + 1 < results.length) {
            setActive(active + 1)
          }
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          if (active - 1 >= 0) {
            setActive(active - 1)
          }
          break
        }
        case 'Control':
        case 'Alt':
        case 'Shift': {
          e.preventDefault()
          setShouldCloseModal(true)
          break
        }
        case 'Enter': {
          e.preventDefault()
          setTrueQuery(query)
          break
        }
      }
    },
    [active, results, query],
  )

  const onKeyUp = useCallback((e: React.KeyboardEvent) => {
    eventRef.current = 'keyboard'
    switch (e.key) {
      case 'Control':
      case 'Alt':
      case 'Shift': {
        e.preventDefault()
        setShouldCloseModal(false)
      }
    }
  }, [])

  useUpdateEffect(() => {
    setActive(0)
  }, [query])

  useUpdateEffect(() => {
    if (!menuRef.current || eventRef.current === 'mouse') return
    const node = menuNodes.map.get(active)
    if (!node) return
  }, [active])

  return (
    <Center display='flex'>
      <Box minW={props.isMobile ? '' : '520px'} paddingBottom={'20px'}>
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
              placeholder='点击左侧按钮查询 (实验性功能)'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                menu.onOpen()
              }}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
            />
            <Center pos='absolute' left={7} h='48px'>
              <a
                onClick={() => {
                  setTrueQuery(query)
                }}
              >
                <SearchIcon color='teal.500' boxSize='20px' />
              </a>
            </Center>
          </Flex>
          <Box p='0' ref={menuRef}>
            {/* maxH='60vh' maxW='520px' */}
            {open && (
              <Box
                sx={{
                  px: 4,
                  bg: 'white',
                  '.chakra-ui-dark &': { bg: 'gray.700' },
                }}
              >
                <Box as='ul' role='listbox' borderTopWidth='1px' pt={2} pb={4}>
                  {results.map((item, index) => {
                    const selected = index === active
                    return (
                      <Popover key={index}>
                        <PopoverTrigger>
                          <Box
                            id={`search-item-${index}`}
                            as='li'
                            aria-selected={selected ? true : undefined}
                            onMouseEnter={() => {
                              setActive(index)
                              eventRef.current = 'mouse'
                            }}
                            onClick={() => {
                              if (shouldCloseModal) {
                                modal.onClose()
                              }
                            }}
                            ref={menuNodes.ref(index)}
                            role='option'
                            key={index}
                            sx={item_sx}
                          >
                            <Box flex='1' ml='4'>
                              <Box fontWeight='semibold'>
                                <FolderZipOutlinedIcon /> {'  '}
                                <Box
                                  as='mark'
                                  bg='transparent'
                                  color='teal.500'
                                >
                                  {item.name}
                                </Box>
                                <Box>
                                  <Text pt='2' fontSize='sm'>
                                    {`Size: ${item.size}`}
                                  </Text>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>下载确认</PopoverHeader>
                          <PopoverBody>
                            你确定要下载吗? {'  '}
                            <Link
                              href={'api/download' + item.name}
                              target='_blank'
                            >
                              <Button bgColor={'deeppink'}>确认✅</Button>
                            </Link>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    )
                  })}
                </Box>
              </Box>
            )}
          </Box>
        </LinkBox>
      </Box>
    </Center>
  )
}

export default Search
