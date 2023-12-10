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

const SearchAll = () => {
  const [query, setQuery] = useState('')
  
}
