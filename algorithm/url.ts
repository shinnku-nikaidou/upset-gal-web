import { Node } from '@/types'

export function generateHref(item: Node, slug: string[]) {
  const a = ['', 'files', ...slug, item.name]

  return a.map(encodeURIComponent).join('/')
}

export function generate_download_url(file_path: string[]) {
  if (file_path[0] == '合集系列') {
    let url = 'https://dl2.oo0o.ooo/file/galgame0/'

    return `${url}${file_path.map(encodeURIComponent).join('/')}`
  } else {
    let url = 'https://dl.oo0o.ooo/file/shinnku/'

    return `${url}${file_path.map(encodeURIComponent).join('/')}`
  }
}

export function trim_file_path(file_path: string) {
  if (file_path.startsWith('合集系列')) {
    return file_path.substring(20)
  }

  return file_path
}
