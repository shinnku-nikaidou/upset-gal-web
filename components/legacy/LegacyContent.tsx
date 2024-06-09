import DefaultInfoProp from '@utils/userDefaultInfoProp'

import ThemeProviderMenu from './Theme'
import { Readme } from './Readme'
import { FileList } from './FileList'

import { create } from 'zustand'
import { TKey } from '@/types/onedrivelegacy'
import { Box, Flex, useToast, Text } from '@chakra-ui/react'
import ExtendIntro from './ExtendIntro'
import Search from '../search'
import { useEffect } from 'react'
import Link from 'next/link'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Card,
  CardFooter,
  Image,
  Button,
  Spacer,
} from '@nextui-org/react'

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
          <Text size='sm'>新增 23tb 生肉资源, 请在主页直接搜索得到</Text>
          <Text size='sm'>
            搜索不到请到首页使用 日文原文 搜索, 还没有就是不存在, 请另寻他处
          </Text>
          <div className='flex gap-4 items-center'>
            <Popover placement='bottom' showArrow={true}>
              <PopoverTrigger>
                <Button>加入qq群</Button>
              </PopoverTrigger>
              <PopoverContent>
                <Card isFooterBlurred radius='lg' className='border-none'>
                  <Image
                    alt='Woman listing to music'
                    className='object-cover'
                    height={200}
                    src='/assets/qq-2.jpg'
                    width={200}
                  />
                  <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
                    <Link
                      className='text-tiny text-white/80'
                      href='https://qm.qq.com/q/cWzTi1eoTK'
                      target='_blank'
                    >
                      入群链接
                    </Link>
                  </CardFooter>
                </Card>
              </PopoverContent>
            </Popover>
            <Button
              as='a'
              href='https://t.me/upsetgal'
              target='_blank'
              variant='ghost'
            >
              加入telegram频道
            </Button>
          </div>
        </Box>
      ),
      status: 'success',
      duration: 20000,
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
