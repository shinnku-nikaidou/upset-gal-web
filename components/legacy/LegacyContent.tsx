import DefaultInfoProp from '@utils/userDefaultInfoProp'

import ThemeProviderMenu from './Theme'
import { Readme } from './Readme'
import { FileList } from './FileList'

import { create } from 'zustand'
import { TKey } from '@/types/onedrivelegacy'
import {
  Box,
  Card,
  CardBody,
  Flex,
  useToast,
  Text,
  Link,
} from '@chakra-ui/react'
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

  useEffect(() => {
    toast({
      title: '公告',
      description: (
        <Card>
          <CardBody>
            <Text>欢迎来到真红/失落的小站, 这里有大量资源随意下载</Text>
            <Text>
              欢迎前往最新开设的{' '}
              <Link
                target='_blank'
                href={'https://bbs.shinnku.com/'}
                style={{
                  color: 'blue',
                }}
              >
                真紅の資源討論組
              </Link>
              , 与同伴们互相交流, 交换这里没有资源吧.
            </Text>
          </CardBody>
        </Card>
      ),
      status: 'success',
      duration: 9000,
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
