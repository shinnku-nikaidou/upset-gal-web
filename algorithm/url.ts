import { Node } from '@/types'

export function generateHref(item: Node, slug: string[]) {
  const a = ['', 'files', ...slug, item.name]

  return a.map(encodeURIComponent).join('/')
}
