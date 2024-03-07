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
  const articleOpen = useGlobalTheme((s) => s.articleOpen)

  // useEffect(() => {
  //   toast({
  //     title: '公告',
  //     render: () => (
  //       <Box
  //         borderRadius='lg'
  //         p={3}
  //         color='black'
  //         bg='rgba(255, 255, 255, 0.6)'
  //         backdropFilter='blur(10px)'
  //         boxShadow='lg'
  //       >
  //         <Text size='sm'>最新资源更新公告</Text>
  //         <Text size='sm'>
  //           1. psp模拟器总计3600部游戏(iso镜像形式) (20231228) (3.6tb)
  //         </Text>
  //         <Text size='sm'>
  //           2. 冷狐总计2540部android apk形式直装galgame(小黄油) (20240214)
  //           (610gb)
  //         </Text>
  //         <Text size='sm'>
  //           3. 抜きゲーみたいな島に住んでる貧乳はどうすりゃいいですか
  //           第二部steam多语言版本 (20240216) (5.2gb)
  //         </Text>
  //       </Box>
  //     ),
  //     status: 'success',
  //     duration: 5000,
  //     isClosable: true,
  //   })
  // }, [toast])

  return (
    <div
      className='site-layout-background'
      style={{ padding: props.isMobile ? 0 : 24, minHeight: 360 }}
    >
      {(() => {
        if (key === null) {
          return (
            <Flex flexDirection={'column'}>
              <Box flex='1'>
                <Search {...props} />
              </Box>
              <Box flex='1'>
                <Readme {...props} />
              </Box>
              <Box pt='10' flex='1'>
                {articleOpen && <ExtendIntro />}
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
