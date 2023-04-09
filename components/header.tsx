import {
  Box,
  Flex,
  HStack,
  HTMLChakraProps,
  Icon,
  IconButton,
  Link,
  chakra,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useUpdateEffect,
} from '@chakra-ui/react'
import { useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaMoon, FaSun, FaTelegram } from 'react-icons/fa'
import { GithubIcon } from './icons/githubIcon'
import LeftDrawer from './leftDrawer'
import Login from './login'

function HeaderContent() {
  const mobileNav = useDisclosure()

  const { toggleColorMode: toggleMode } = useColorMode()

  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const mobileNavBtnRef = useRef<HTMLButtonElement>()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  return (
    <>
      <Flex w='100%' h='100%' px='6' align='center' justify='space-between'>
        <Flex align='center'>
          <LeftDrawer />
          <Box w='20px'></Box>
          <Login />
        </Flex>

        <Flex
          justify='flex-end'
          w='100%'
          align='center'
          color='gray.400'
          maxW='1100px'
        >
          <HStack spacing='5' display={{ base: 'none', md: 'flex' }}>
            <Link
              isExternal
              aria-label='Go to upset-gal GitHub page'
              href={'https://github.com/shinnku-nikaidou/upset-gal-web'}
            >
              <Icon
                as={GithubIcon}
                display='block'
                transition='color 0.2s'
                w='5'
                h='5'
                _hover={{ color: 'gray.600' }}
              />
            </Link>

            <Link
              isExternal
              aria-label='Go to upset gal Group channel'
              href={'https://t.me/upsetGroup/'}
            >
              <Icon
                as={FaTelegram}
                display='block'
                transition='color 0.2s'
                w='5'
                h='5'
                _hover={{ color: 'gray.600' }}
              />
            </Link>
          </HStack>
          <HStack spacing='5'>
            <IconButton
              size='md'
              fontSize='lg'
              aria-label={`Switch to ${text} mode`}
              variant='ghost'
              color='current'
              ml={{ base: '0', md: '3' }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
          </HStack>
        </Flex>
      </Flex>
    </>
  )
}

function Header(props: HTMLChakraProps<'header'>) {
  const { maxW = '8xl', maxWidth = '8xl' } = props
  const ref = useRef<any>()
  const [y, setY] = useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition='box-shadow 0.2s, background-color 0.2s'
      pos='sticky'
      top='0'
      zIndex='3'
      bg='white'
      _dark={{ bg: 'gray.800' }}
      left='0'
      right='0'
      width='full'
      {...props}
    >
      <chakra.div height='4.5rem' mx='auto' maxW={maxW} maxWidth={maxWidth}>
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  )
}

export default Header
