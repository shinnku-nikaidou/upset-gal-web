import DefaultInfoProp from '@utils/userDefaultInfoProp'

import ThemeProviderMenu from './Theme'
import { Readme } from './Readme'
import { FileList } from './FileList'

import { create } from 'zustand'
import { getAccount } from '@utils/algorithms'
import { TKey } from '@/types/onedrivelegacy'
import { keyMap } from '@/const'

interface FileListState {
  url: string
  setUrl: (url: string) => void
  urlPrefix: string
  key: TKey
  setKey: (key: TKey) => void
  page: number
  setPage: (page: number) => void
}

const useFileList = create<FileListState>((set) => ({
  url: '',
  urlPrefix: getAccount(),
  key: null,
  page: 1,

  setUrl: (url: string) => set(() => ({ url: url })),
  setKey: (key: TKey) => set(() => ({ key: key })),

  setPage: (page: number) => set(() => ({ page: page })),
}))

export { useFileList }

const LegacyContent = (props: DefaultInfoProp) => {
  const { key, url, setUrl, urlPrefix } = useFileList()

  return (
    <div
      className='site-layout-background'
      style={{ padding: props.isMobile ? 0 : 24, minHeight: 360 }}
    >
      {key !== null &&
        (key === '10' ? (
          <ThemeProviderMenu isMobile={props.isMobile} lang={props.lang} />
        ) : url !== '' ? (
          <FileList
            url={url}
            changeDirectory={(name: any) =>
              setUrl(`api/download/${urlPrefix}/${keyMap[key]}/${name}`)
            }
            lang={props.lang}
            isMobile={props.isMobile}
          />
        ) : (
          <></>
        ))}
      {key === null && <Readme isMobile={props.isMobile} lang={props.lang} />}
    </div>
  )
}

export default LegacyContent
