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
        <div className='flex w-screen max-w-[960px]'>
          <div className={'pl-1 md:w-60'}>
            <Sidebar />
          </div>
          <div className='flex-1 px-10'>
            <GameIntro info={node} />
          </div>
        </div>
      </div>
    )
  }

  const inode = node2list(node)

  return (
    <div className='flex w-full max-w-3xl gap-2 mx-auto sm:gap-4'>
      <RoundArrowButton />
      <Sidebar />
      <div className='w-full'>
        <FileList inode={inode} slug={slug} />
      </div>
    </div>
  )
}
