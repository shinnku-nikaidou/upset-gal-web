import { notFound } from 'next/navigation'

import { checknodevariety, node2list } from '@/algorithm/tree'
import { Sidebar } from '@/components/sidebar'
import { FileList } from '@/components/fileList'
import { tree } from '@/config/root'
import { RoundArrowButton } from '@/components/returnButton'
import { GameIntro } from '@/components/gameIntro'

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
      <div>
        <RoundArrowButton />
        <div className='flex flex-1 min-w-max max-w-[960px] w-screen'>
          <div className={'md:w-60 pl-1'}>
            <Sidebar />
          </div>
          <div className='pl-4 md:pl-20 md:min-w-96 max-w-[400px] md:max-w-[600px]'>
            <GameIntro info={node} />
          </div>
        </div>
      </div>
    )
  }

  const inode = node2list(node)

  return (
    <div>
      <RoundArrowButton />
      <div className='flex flex-1 min-w-max max-w-[960px] w-screen'>
        <div className={'md:w-60 pl-1'}>
          <Sidebar />
        </div>
        <div className='pl-12 min-w-96'>
          <FileList inode={inode} slug={slug} />
        </div>
      </div>
    </div>
  )
}
