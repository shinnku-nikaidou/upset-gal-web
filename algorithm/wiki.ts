/* eslint-disable no-console */
type Lang = 'ja' | 'zh' | 'en'

export default async function wikisearch(query: string, lang: Lang = 'zh') {
  const queurl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&srlimit=5`

  console.log(queurl)
  const res = await (await fetch(queurl)).json()

  console.log(JSON.stringify(res))
  try {
    const pageid: number = res['query']['search'][0]['pageid']

    console.log(pageid)
    const quer = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&pageids=${pageid}&prop=info|categories|langlinks|extracts&explaintext=&`
    const ans = await (await fetch(quer)).json()

    console.log(JSON.stringify(ans))
    const context = ans['query']['pages'][`${pageid}`]

    return {
      title: context['title'],
      text: context['extract'],
    }
  } catch (e) {
    return e
  }
}
