import { notFound } from 'next/navigation'

import { checknodevariety, node2list } from '@/algorithm/tree'
import { Sidebar } from '@/components/sidebar'
import { FileList } from '@/components/fileList'
import { tree } from '@/config/root'

export default async function BrowserPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const slug = (await params).slug.map(decodeURIComponent)
  let node: any = tree

  for (const key of slug) {
    node = node[key]
  }

  let variety = checknodevariety(node)

  if (variety === '404') {
    notFound()
  }

  if (variety === 'file') {
    return (
      <div className='flex flex-1'>
        <div className={'w-60 pl-1'}>
          <Sidebar />
        </div>
        <div className='pl-20'>
          <p className='text-gray-300'>{JSON.stringify(slug)}</p>
          <p>{variety}</p>
        </div>
      </div>
    )
  }

  const inode = node2list(node)

  return (
    <div className='flex flex-1'>
      <div className={'w-60 pl-1'}>
        <Sidebar />
      </div>
      <div className='pl-12'>
        <FileList inode={inode} />
      </div>
    </div>
  )
}
