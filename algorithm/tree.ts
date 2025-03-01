import { FileInfo } from '@/types'

export function generateTree(fileList: FileInfo[]): any {
  const root: { [key: string]: any } = {}

  for (const file of fileList) {
    const filePath = file.file_path
    const pathParts = filePath.split('/')
    let pointer = root
    const l = pathParts.length - 1

    for (let i = 0; i < l; i++) {
      const part = pathParts[i]

      if (pointer[part] === undefined) {
        pointer[part] = {}
      }
      pointer = pointer[part]
    }
    pointer[pathParts[l]] = file
  }

  return root
}
