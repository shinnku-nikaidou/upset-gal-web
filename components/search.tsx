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
import { useRouter } from 'next/router'
import { findAll } from 'highlight-words-core'

import Link from 'next/link'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MultiRef from 'react-multi-ref'

interface OptionTextProps {
  searchWords: string[]
  textToHighlight: string
}

function OptionText({ searchWords, textToHighlight }: OptionTextProps) {
  const chunks = findAll({
    searchWords,
    textToHighlight,
    autoEscape: true,
  })

  const highlightedText = chunks.map((chunk) => {
    const { end, highlight, start } = chunk
    const text = textToHighlight.substring(start, end - start)
    if (highlight) {
      return (
        <Box key={chunk.start} as='mark' bg='transparent' color='teal.500'>
          {text}
        </Box>
      )
    } else {
      return text
    }
  })

  return <>{highlightedText}</>
}

const Search = (props: { isMobile: boolean; lang: string }) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [shouldCloseModal, setShouldCloseModal] = useState(true)
  const menu = useDisclosure()
  const modal = useDisclosure()
  const [menuNodes] = useState(() => new MultiRef<number, HTMLElement>())
  const menuRef = useRef<HTMLDivElement>(null)
  const eventRef = useRef<'mouse' | 'keyboard' | null>(null)

  useEffect(() => {
    router.events.on('routeChangeComplete', modal.onClose)
    return () => {
      router.events.off('routeChangeComplete', modal.onClose)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const results = useMemo(
    function getResults() {
      console.log(query)
      if (query.length < 2) return []
      return [
        {
          url: 'https://www.google.com/',
          type: 'lv1',
          id: '114514',
          content: 'this is google',
          hierarchy: { lvl1: '100' },
        },
        {
          url: 'https://www.bing.com/',
          type: 'lv2',
          id: '1919',
          content: 'this is bing, no head',
          hierarchy: {},
        },
      ]
    },
    [query],
  )

  const open = menu.isOpen && results.length > 0

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
          if (results?.length <= 0) {
            break
          }

          modal.onClose()
          router.push(results[active].url)
          break
        }
      }
    },
    [active, modal, results, router],
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
      <Box minW={props.isMobile ? '' : '520px'}>
        <LinkBox
          as='article'
          borderWidth='1px'
          transition='box-shadow 0.1s ease-out'
          overflow='hidden'
          rounded="24px"
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
              placeholder='Search the visual novel'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                menu.onOpen()
              }}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
            />
            <Center pos='absolute' left={7} h='48px'>
              <SearchIcon color='teal.500' boxSize='20px' />
            </Center>
          </Flex>
          <Box maxH='60vh' maxW='520px' p='0' ref={menuRef}>
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
                    const isLvl1 = item.type === 'lvl1'

                    return (
                      <Link key={item.id} href={item.url} passHref>
                        <a>
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
                            key={item.id}
                            sx={{
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
                            }}
                          >
                            <Box flex='1' ml='4'>
                              {!isLvl1 && (
                                <Box
                                  fontWeight='medium'
                                  fontSize='xs'
                                  opacity={0.7}
                                >
                                  {item.hierarchy.lvl1}
                                </Box>
                              )}
                              <Box fontWeight='semibold'>
                                <OptionText
                                  searchWords={[query]}
                                  textToHighlight={item.content}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </a>
                      </Link>
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
