import DefaultInfoProp from '@utils/userDefaultInfoProp'

import ThemeProviderMenu from './Theme'
import { Readme } from './Readme'
import { FileList } from './FileList'

import { create } from 'zustand'
import { TKey } from '@/types/onedrivelegacy'
import { Box, Flex, useToast, Text } from '@chakra-ui/react'
import ExtendIntro from './ExtendIntro'
import useGlobalTheme from '@/utils/persist/theme'
import Search from '../search'
import { useEffect } from 'react'
import Link from 'next/link'

interface FileListState {
  url: string
  setUrl: (url: string) => void
  key: TKey
  setKey: (key: TKey) => void
  page: number
  setPage: (page: number) => void
}

const useFileListStore = create<FileListState>((set) => ({
  url: '',
  key: null,
  page: 1,

  setUrl: (url: string) => set(() => ({ url: url })),
  setKey: (key: TKey) => set(() => ({ key: key })),

  setPage: (page: number) => set(() => ({ page: page })),
}))

export { useFileListStore }

const LegacyContent = (props: DefaultInfoProp) => {
  const toast = useToast()
  const { key } = useFileListStore()

  useEffect(() => {
    toast({
      title: '公告',
      render: () => (
        <Box
          borderRadius='lg'
          p={3}
          color='black'
          bg='rgba(255, 255, 255, 0.6)'
          backdropFilter='blur(10px)'
          boxShadow='lg'
        >
          <Text size='sm'>
            搜索不到请到首页使用 日文原文 搜索, 还没有就是不存在, 请另寻他处
          </Text>
          <Text size='sm'>
            加入最新telegram群组{' '}
            <Link href={'https://t.me/upsetgal'} target='_blank'>
              https://t.me/upsetgal
            </Link>
          </Text>
        </Box>
      ),
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }, [toast])

  return (
    <div
      className='site-layout-background'
      style={{ padding: props.isMobile ? 0 : 24, minHeight: 360 }}
    >
      {(() => {
        if (key === null) {
          return (
            <Flex flexDirection='column'>
              <Box flex='1'>
                <Search {...props} />
              </Box>
              <Box flex='1'>
                <Readme {...props} />
              </Box>
              <Box pt='10' flex='1'>
                <ExtendIntro />
              </Box>
            </Flex>
          )
        } else if (key === '10') {
          return <ThemeProviderMenu {...props} />
        } else {
          return <FileList {...props} />
        }
      })()}
    </div>
  )
}

export default LegacyContent
