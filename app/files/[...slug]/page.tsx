import { notFound } from 'next/navigation'

import { checknodevariety, node2list } from '@/algorithm/tree'
import { Sidebar } from '@/components/sidebar'
import { FileList } from '@/components/fileList'
import { tree } from '@/config/root'
import { RoundArrowButton } from '@/components/returnButton'
import { GameIntro } from '@/components/gameIntro'
import { FileListWrapper } from '@/components/adaptive'

export default async function BrowserPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const origin_slug = (await params).slug
  const slug = [...origin_slug.map(decodeURIComponent)]

  origin_slug.pop()
  let node: any = tree

  try {
    for (const key of slug) {
      node = node[key]
    }
  } catch {
    notFound()
  }

  let variety = checknodevariety(node)

  if (variety === '404') {
    notFound()
  }

  if (variety === 'file') {
    return (
      <div className='flex flex-col md:flex-row'>
        <RoundArrowButton />
        <div className='flex max-w-[960px] w-screen'>
          <div className={'md:w-60 pl-1'}>
            <Sidebar />
          </div>
          <div className='flex-1'>
            <GameIntro info={node} />
          </div>
        </div>
      </div>
    )
  }

  const inode = node2list(node)

  return (
    <div className='w-full max-w-3xl mx-auto grid grid-cols-6 sm:grid-cols-4 gap-2 sm:gap-4'>
      <RoundArrowButton />
      <Sidebar />
      <div className='col-span-5 sm:col-span-3 sm:row-span-2'>
        <FileList inode={inode} slug={slug} />
      </div>
    </div>
  )
}
