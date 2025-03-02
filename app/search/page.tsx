import { notFound } from 'next/navigation'

import { title } from '@/components/primitives'
import Search from '@/components/search/search'
import { SearchAnswer } from '@/components/search/search-answer'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const q = (await searchParams).q as string

  if (q) {
    return (
      <div>
        <div className='max-w-[720px] pl-10'>
          <Search initialSearchTerm={q} />
        </div>
        <div className='grid grid-cols-2 pt-10 pl-10'>
          <div>
            <SearchAnswer />
          </div>
          <div>
            {/* Right side content */}
            <p>This is the right side of the page.</p>
          </div>
        </div>
      </div>
    )
  } else {
    notFound()
  }
}
