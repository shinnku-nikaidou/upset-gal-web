import { useCallback, useState, useLayoutEffect } from 'react'
import { Dropdown, Input, MenuProps, message, Pagination } from 'antd'
import { Item } from '@/types/onedrivelegacy'
import { searchEngine, shuffleArray } from '@algorithm'
import { GenerateRightClickMenu } from './RightClick'
import { create } from 'zustand'
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Skeleton,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined'

const FileItem = ({
  key,
  item,
  url,
  lang,
}: {
  key: number
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
    <Box key={key}>
      <Dropdown menu={{ items }} trigger={['contextMenu', 'click']}>
        <span>
          <Heading as='h6' size='xs'>
            <FolderZipOutlinedIcon /> {'  '}
            {item.name}
          </Heading>
          <Text pt='2' fontSize='sm'>
            {`Size: ${item.size}`}
          </Text>
        </span>
      </Dropdown>
    </Box>
  )
}

const FolderItem = ({
  item,
  key,
  changeDirectory,
  setPage,
}: {
  item: Item
  key: number
  changeDirectory: (name: string) => void
  setPage: (page: number) => void
}) => {
  return (
    <Box
      key={key}
      onClick={() => {
        changeDirectory(item.name)
        setPage(1)
      }}
    >
      <Heading as='h6' size='xs'>
        <FolderOpenOutlinedIcon /> {'  '}
        {item.name}
      </Heading>
      <Text pt='2' fontSize='sm'>
        {`Total Size: ${item.size}`}
      </Text>
    </Box>
  )
}

interface IFileListProps {
  url: string
  changeDirectory: (name: string) => void
  lang: string
  isMobile: boolean
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

export const FileList = ({
  url,
  changeDirectory,
  lang,
  isMobile,
}: IFileListProps) => {
  const files = useFileStore((state) => state.files)
  const setFiles = useFileStore((s) => s.setFiles)
  const [dispFiles, setDispFiles] = useState<Item[]>([])

  useLayoutEffect(() => {
    const hide = message.loading('正在加载中', 0)
    const a = async (hide: any) => {
      console.log(`url is ${url}`)
      await fetch(`${window.location.origin}/${url}`)
        .then((res) => res.json())
        .then((data: Item[]) => {
          shuffleArray(data)
          setFiles(data)
          setDispFiles(data)
        })
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

  if (files.length === 0) return <Skeleton isLoaded={true} />

  return (
    <div>
      <Card>
        <CardHeader>
          <Input.Search
            placeholder='Input search text'
            enterButton='Search'
            size='large'
            onSearch={onSearch}
          />
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            {dispFiles
              .slice((page - 1) * 6, page * 6)
              .map((item: Item, key: number) => {
                if (item['@type'] === 'file') {
                  return (
                    <FileItem key={key} item={item} url={url} lang={lang} />
                  )
                } else {
                  return (
                    <FolderItem
                      key={key}
                      item={item}
                      changeDirectory={changeDirectory}
                      setPage={setPage}
                    />
                  )
                }
              })}
          </Stack>
        </CardBody>
        <CardFooter>
          <Pagination
            size={isMobile ? 'small' : 'default'}
            total={dispFiles.length}
            showSizeChanger={false}
            showQuickJumper
            onChange={onPaginationChange}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
