import { WikipediaAnswer } from '@/types/wiki'

/* eslint-disable no-console */
type Lang = 'ja' | 'zh' | 'en'

export default async function wikisearch(
  query: string,
  lang: Lang = 'zh',
): Promise<WikipediaAnswer> {
  const queurl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&srlimit=1`

  const res = await (await fetch(queurl)).json()

  try {
    const pageid: number = res['query']['search'][0]['pageid']

    const quer = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&pageids=${pageid}&prop=info|categories|langlinks|extracts&explaintext=&`
    const ans = await (await fetch(quer)).json()

    const context = ans['query']['pages'][`${pageid}`]

    return {
      title: context['title'],
      text: context['extract'],
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      title: '',
      text: '',
    }
  }
}
