import { useCallback, useState, useLayoutEffect } from 'react'
import {
  Divider,
  Dropdown,
  Input,
  List,
  MenuProps,
  message,
  Pagination,
  Skeleton,
} from 'antd'
import { Item } from '@/types/onedrivelegacy'
import { searchEngine, shuffleArray } from '@algorithm'
import { GenerateRightClickMenu } from './RightClick'
import { create } from 'zustand'

const FileItem = ({
  item,
  url,
  lang,
}: {
  item: Item
  url: string
  lang: string
}) => {
  const items: MenuProps['items'] = GenerateRightClickMenu({
    item: item,
    url: url,
    lang: lang,
  })
  return (
    <List.Item style={{ paddingLeft: '20px' }}>
      <Dropdown menu={{ items }} trigger={['contextMenu', 'click']}>
        <List.Item.Meta
          title={item.name}
          description={`Size: ${item.size}, Type: ${item['@type']}`}
        />
      </Dropdown>
    </List.Item>
  )
}

const FolderItem = ({
  item,
  changeDirectory,
}: {
  item: Item
  changeDirectory: (name: string) => void
}) => (
  <List.Item
    style={{ paddingLeft: '20px' }}
    onClick={() => {
      changeDirectory(item.name)
    }}
  >
    <List.Item.Meta
      title={item.name}
      description={`Size: ${item.size}, Type: ${item['@type']}`}
    />
  </List.Item>
)

interface IFileListProps {
  url: string
  changeDirectory: (name: string) => void
  lang: string
}

interface FileState {
  files: Item[]
  removeAllFiles: () => void
  setFiles: (newFiles: Item[]) => void
}

const useFileStore = create<FileState>((set) => ({
  files: [],
  removeAllFiles: () => set({ files: [] }),
  setFiles: (newFiles: Item[]) => set({ files: newFiles }),
}))

export const FileList = ({ url, changeDirectory, lang }: IFileListProps) => {
  const files = useFileStore((state) => state.files)
  const setFiles = useFileStore((s) => s.setFiles)
  const [dispFiles, setDispFiles] = useState<Item[]>([])

  useLayoutEffect(() => {
    const hide = message.loading('正在加载中', 0)
    const a = async (hide: any) => {
      let res: Item[] = []
      console.log(`url is ${url}`)
      const resp = await fetch(`${window.location.origin}/${url}`)
      if (resp.status === 200 || resp.status === 304) {
        try {
          res = await resp.json()
          shuffleArray(res)
          setFiles(res)
          setDispFiles(res)
        } catch (e) {
          console.error('in FileList loading', e)
          hide()
        }
      } else {
        console.error(resp.status)
      }
      hide()
    }
    a(hide)
  }, [setFiles, url])

  const [page, setPage] = useState(1)
  const onPaginationChange = useCallback((e: number) => setPage(e), [setPage])

  const onSearch = useCallback(
    (val: string) => {
      const tmp = searchEngine(val, files)
      const newArrayFile = tmp.map((v) => v[0])
      setFiles(newArrayFile)
      setDispFiles(tmp.filter((v) => v[1] > 0).map((v) => v[0]))
      setPage(1)
    },
    [files, setFiles, setDispFiles, setPage],
  )

  if (files.length === 0) return <Skeleton active />

  return url === '' ? (
    <Skeleton active />
  ) : (
    <div>
      <Input.Search
        placeholder='Input search text'
        enterButton='Search'
        size='large'
        onSearch={onSearch}
      />
      <List
        itemLayout='horizontal'
        dataSource={dispFiles.slice((page - 1) * 8, page * 8)}
        renderItem={(item: Item) => {
          if (item['@type'] === 'file') {
            return <FileItem item={item} url={url} lang={lang} />
          }
          return <FolderItem item={item} changeDirectory={changeDirectory} />
        }}
      />
      <Pagination
        size='small'
        total={dispFiles.length}
        showSizeChanger={false}
        showQuickJumper
        onChange={onPaginationChange}
      />
      <Divider dashed />
    </div>
  )
}
