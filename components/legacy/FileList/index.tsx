import { useCallback, useState, useEffect } from 'react'
import { Dropdown, Input, MenuProps, Pagination } from 'antd/lib'
import { FrontItem } from '@/types'
import { searchEngine, shuffleArray } from '@algorithm'
import { GenerateRightClickMenu } from './RightClick'
import { create } from 'zustand'
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined'
import { useFileListStore } from '../LegacyContent'
import DefaultInfoProp from '@/utils/userDefaultInfoProp'

interface IFileItemProps {
  item: FrontItem
  lang: string
}

const FileItem = ({ item, lang }: IFileItemProps) => {
  const url = useFileListStore().url
  const items: MenuProps['items'] = GenerateRightClickMenu({
    item: item,
    url: url,
    lang: lang,
  })
  return (
    <Box>
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

const FolderItem = ({ item }: { item: FrontItem }) => {
  const { url, setUrl, setPage } = useFileListStore()
  return (
    <Box
      onClick={() => {
        setUrl(url + '/' + item.name)
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

interface FileState {
  files: FrontItem[]
  cacheURL: string | null
  removeAllFiles: () => void
  setFiles: (newFiles: FrontItem[], url: string) => void
}

const useFileStore = create<FileState>((set) => ({
  files: [],
  cacheURL: null,
  removeAllFiles: () => set({ files: [], cacheURL: null }),
  setFiles: (newFiles: FrontItem[], url: string) =>
    set({ files: newFiles, cacheURL: url }),
}))

export const FileList = ({ lang, isMobile }: DefaultInfoProp) => {
  const { files, setFiles, cacheURL } = useFileStore()
  const url = useFileListStore().url
  const [dispFiles, setDispFiles] = useState<FrontItem[]>([])

  useEffect(() => {
    console.log(`url is ${url}`)
    if (cacheURL !== url) {
      console.log(`cache miss, now fetching`)
      fetch(`${window.location.origin}/${url}`)
        .then((res) => res.json())
        .then((data: FrontItem[]) => {
          shuffleArray(data)
          setFiles(data, url)
          setDispFiles(data)
        })
        .then(() => console.log('fetch success'))
    } else {
      console.log(`cache hit ${cacheURL}`)
    }
  }, [cacheURL, setFiles, url])

  const { page, setPage } = useFileListStore()
  const onPaginationChange = useCallback((e: number) => setPage(e), [setPage])

  const onSearch = useCallback(
    (val: string) => {
      const tmp = searchEngine(val, files)
      const newArrayFile = tmp.map((v) => v[0])
      setFiles(newArrayFile, url)
      setDispFiles(tmp.filter((v) => v[1] > 0).map((v) => v[0]))
      setPage(1)
    },
    [files, setFiles, url, setPage],
  )

  return (
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
            .map((item: FrontItem, key: number) => {
              if (item['@type'] === 'file') {
                return <FileItem key={key} item={item} lang={lang} />
              } else {
                return <FolderItem key={key} item={item} />
              }
            })}
        </Stack>
      </CardBody>
      <CardFooter>
        <Pagination
          size={isMobile ? 'small' : 'default'}
          total={dispFiles.length}
          current={page}
          showQuickJumper
          hideOnSinglePage
          onChange={onPaginationChange}
        />
      </CardFooter>
    </Card>
  )
}
