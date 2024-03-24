import { useCallback, useState, useEffect } from 'react'
import { FrontItem } from '@/types'
import { nginxTransChar, searchEngine, shuffleArray } from '@algorithm'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Pagination,
} from '@nextui-org/react'

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
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined'
import { useFileListStore } from '../LegacyContent'
import DefaultInfoProp from '@/utils/userDefaultInfoProp'
import SearchInput from './SearchInput'
import t from '@/lang'

interface IFileItemProps {
  item: FrontItem
  lang: string
}
const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

const FileItem = ({ item, lang }: IFileItemProps) => {
  const url = useFileListStore().url

  const downloadLink = `${window.location.origin}/${url}/${nginxTransChar(
    item.name,
  )}`

  const copyLink = useCallback(
    () => navigator.clipboard.writeText(downloadLink),
    [downloadLink],
  )

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Box>
            <Heading as='h6' size='xs'>
              <FolderZipOutlinedIcon /> {'  '}
              {item.name}
            </Heading>
            <Text pt='2' fontSize='sm'>
              {`Size: ${item.size}`}
            </Text>
          </Box>
        </DropdownTrigger>
        <DropdownMenu
          variant='faded'
          aria-label='Dropdown menu with description'
          disabledKeys={['discription']}
        >
          <DropdownSection title='Actions' showDivider>
            <DropdownItem
              key='download'
              description='download'
              href={downloadLink}
              target='_blank'
              rel='noreferrer'
              startContent={<FileDownloadIcon className={iconClasses} />}
            >
              {t('Download1', lang) + item.name}
            </DropdownItem>
            <DropdownItem
              key='copy'
              shortcut='⌘C'
              description='Copy the file link'
              startContent={<ContentCopyIcon className={iconClasses} />}
              onClick={copyLink}
            >
              {t('Download2', lang)}
            </DropdownItem>
            <DropdownItem key='discription' description='游戏简介'>
              查看游戏简介
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title='AD'>
            <DropdownItem
              href={'https://congyu01.top/auth/register?invite=e30dc2bc97'}
              target='_blank'
              rel='noreferrer'
              description='丛雨云 congyu.moe'
            >
              下载慢? 说明被运营商掐网络了, 试试丛雨vpn
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
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
        <SearchInput onSearch={onSearch} isMobile={isMobile} />
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
          size={isMobile ? 'sm' : 'lg'}
          total={Math.ceil(dispFiles.length / 6)}
          initialPage={1}
          onChange={onPaginationChange}
        />
      </CardFooter>
    </Card>
  )
}
