import { title } from '@/components/primitives'
import { tree } from '@/config/root'

export default async function BrowserPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const slug = (await params).slug
  let node: any = tree

  for (const key of slug) {
    node = node[key]
  }

  return (
    <div>
      <h1 className={title()}>Browser</h1>
      <p>{JSON.stringify(slug)}</p>
      <p>{JSON.stringify(node)}</p>
    </div>
  )
}
