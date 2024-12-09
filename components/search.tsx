import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  chakra,
  Flex,
  LinkBox,
  useDisclosure,
  useEventListener,
  useUpdateEffect,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import MultiRef from 'react-multi-ref'
import { NewFrontItem } from '@/types'
import { nginxTransChar } from '@algorithm'
import { ItemsMeta } from './legacy/FileList'

const Search = (props: { isMobile: boolean; lang: string }) => {
  const [trueQuery, setTrueQuery] = useState('')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const menu = useDisclosure()
  const modal = useDisclosure()
  const [menuNodes] = useState(() => new MultiRef<number, HTMLElement>())
  const menuRef = useRef<HTMLDivElement>(null)
  const eventRef = useRef<'mouse' | 'keyboard' | null>(null)

  const [results, setResults] = useState<Array<NewFrontItem>>([])

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
              placeholder='请输入中文或者日文'
              value={query}
              onChange={(e: { target: { value: any } }) => {
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
            {open && (
              <Box
                sx={{
                  px: 4,
                  bg: 'white',
                  '.chakra-ui-dark &': { bg: 'gray.700' },
                }}
              >
                <Box as='ul' role='listbox' borderTopWidth='1px' pt={2} pb={4}>
                  {results.map(
                    (item: { name: string; size: string }, index: number) => {
                      const selected = index === active
                      const parts = item.name.split('/').slice(1)
                      let showstring = item.name
                      if (parts[0].startsWith('raw')) {
                        showstring = `(生肉) 文件路径是: ${item.name}`
                      } else if (parts[0].startsWith('psp')) {
                        showstring = `(psp模拟器) 文件路径是: ${item.name}`
                      } else if (parts[0].startsWith('zd')) {
                        showstring = `(汉化硬盘) 文件路径是: ${item.name}`
                      } else if (parts[0].startsWith('0')) {
                        showstring = `文件路径是: ${item.name}`
                        if (parts[1].startsWith('krkr')) {
                          showstring = `(手机krkr模拟器) 文件路径是: ${item.name}`
                        }
                      }

                      const downloadLink = `${
                        window.location.origin
                      }/api/download${nginxTransChar(item.name)}`
                      const filename = parts[parts.length - 1]
                      return (
                        <Box
                          id={`search-item-${index}`}
                          as='li'
                          aria-selected={selected ? true : undefined}
                          onMouseEnter={() => {
                            setActive(index)
                            eventRef.current = 'mouse'
                          }}
                          ref={menuNodes.ref(index)}
                          role='option'
                          key={index}
                          sx={item_sx}
                        >
                          <ItemsMeta
                            lang={props.lang}
                            filename={filename}
                            showstring={showstring}
                            downloadLink={downloadLink}
                            size={item.size}
                            key={index}
                          />
                        </Box>
                      )
                    },
                  )}
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
