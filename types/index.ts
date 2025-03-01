import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type FileInfo = {
  file_path: string
  upload_timestamp: number
  file_size: number
}
