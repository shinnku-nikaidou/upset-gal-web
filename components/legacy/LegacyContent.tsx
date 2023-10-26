import DefaultInfoProp from '@utils/userDefaultInfoProp'

import ThemeProviderMenu from './Theme'
import { Readme } from './Readme'
import { FileList } from './FileList'

import { create } from 'zustand'
import { getAccount } from '@utils/algorithms'
import { TKey } from '@/types/onedrivelegacy'
import { Box, Flex } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import ExtendIntro from './ExtendIntro'
import useGlobalTheme from '@/utils/persist/theme'

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
  const { key } = useFileListStore()
  const articleOpen = useGlobalTheme((s) => s.articleOpen)

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
                <Readme isMobile={props.isMobile} lang={props.lang} />
              </Box>
              <Box pt='10' flex='1'>
                {articleOpen && <ExtendIntro />}
              </Box>
            </Flex>
          )
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
