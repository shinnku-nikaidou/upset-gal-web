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

export function trim_wikipedia_ans(text: string) {
  const p1 = text.indexOf('== 參考')
  const t1 = p1 != -1 ? text.substring(0, p1) : text

  const p2 = t1.indexOf('== 参考')
  const t2 = p2 != -1 ? t1.substring(0, p2) : t1

  return t2
}

export function wikipediaToMarkdown(wikipediaText: string): string {
  const regex = /^(={2,})\s*(.*?)\s*(={2,})$/gm

  return wikipediaText.replace(regex, (match, startEquals, title) => {
    const level = startEquals.length
    const markdownHashes = '#'.repeat(level)

    return `${markdownHashes} ${title}`
  })
}
