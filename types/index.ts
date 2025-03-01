import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type FileInfo = {
  file_path: string
  upload_timestamp: number
  file_size: number
}

export type Node =
  | { type: 'file'; name: string; info: FileInfo }
  | { type: 'folder'; name: string }

export type Inode = Node[]

export type Variety = '404' | 'file' | 'folder'
