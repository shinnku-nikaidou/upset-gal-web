import { title } from '@/components/primitives'
import { Sidebar } from '@/components/sidebar'
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

  return (
    <div className='flex flex-1'>
      <div className={'w-60 pl-1'}>
        <Sidebar />
      </div>
      <div className='pl-20 overflow-y-scroll'>
        <h1 className={title()}>Browser</h1>
        <p>{JSON.stringify(slug)}</p>
        <p>{JSON.stringify(node)}</p>
      </div>
    </div>
  )
}
