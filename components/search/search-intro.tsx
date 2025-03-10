'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ScrollShadow } from '@heroui/react'
import remarkBreaks from 'remark-breaks'

import { WikipediaAnswer } from '@/types/wiki'
import { subtitle, title } from '@/components/primitives'
import { trim_wikipedia_ans, wikipediaToMarkdown } from '@/algorithm/url'

interface SearchIntroProps {
  name: string
}

export const SearchIntro: React.FC<SearchIntroProps> = ({ name }) => {
  const [wikians, setWikians] = useState<WikipediaAnswer>({
    title: name,
    text: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (wikians.bg) {
      const boxMain = document.getElementById('box-main')!
      console.log(`set bg image https://www.shinnku.com/image/${wikians.bg}`)
      boxMain.style.backgroundImage = `url('https://www.shinnku.com/image/${wikians.bg}')`
    }
  }, [wikians.bg])

  useEffect(() => {
    if (loading) {
      setLoading(false)
      fetch(`/api/wiki?name=${encodeURIComponent(name)}`)
        .then(async (res) => res.json())
        .then((data) => setWikians(data))
    }
  })

  return (
    <ScrollShadow
      hideScrollBar
      className='inline-block h-[800px] max-w-xl justify-center text-center'
      size={100}
    >
      <div className={title({ color: 'violet' })}>{wikians.title}</div>
      <div className={subtitle()}>结果很可能不准确，仅作参考</div>
      <div className='prose dark:prose-invert'>
        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
          {wikipediaToMarkdown(trim_wikipedia_ans(wikians.text))}
        </ReactMarkdown>
      </div>
    </ScrollShadow>
  )
}
