import DefaultInfoProp from '@utils/userDefaultInfoProp'

import ThemeProviderMenu from './Theme'
import { Readme } from './Readme'
import { FileList } from './FileList'

import { create } from 'zustand'
import { getAccount } from '@utils/algorithms'
import { TKey } from '@/types/onedrivelegacy'
import { keyMap } from '@/const'
import { Flex, Box } from '@chakra-ui/react'

interface FileListState {
  url: string
  setUrl: (url: string) => void
  urlPrefix: string
  key: TKey
  setKey: (key: TKey) => void
  page: number
  setPage: (page: number) => void
}

const useFileListStore = create<FileListState>((set) => ({
  url: '',
  urlPrefix: getAccount(),
  key: null,
  page: 1,

  setUrl: (url: string) => set(() => ({ url: url })),
  setKey: (key: TKey) => set(() => ({ key: key })),

  setPage: (page: number) => set(() => ({ page: page })),
}))

export { useFileListStore }

const LegacyContent = (props: DefaultInfoProp) => {
  const { key, url, setUrl, urlPrefix } = useFileListStore()

  const a = (
    <Flex>
      <Box flex='1'></Box>
      <Box flex='1'>box332454435</Box>
    </Flex>
  )

  return (
    <div
      className='site-layout-background'
      style={{ padding: props.isMobile ? 0 : 24, minHeight: 360 }}
    >
      {(() => {
        if (key === null) {
          return <Readme isMobile={props.isMobile} lang={props.lang} />
        } else if (key === '10') {
          return (
            <ThemeProviderMenu isMobile={props.isMobile} lang={props.lang} />
          )
        } else {
          return <FileList isMobile={props.isMobile} lang={props.lang} />
        }
      })()}
    </div>
  )
}

export default LegacyContent
