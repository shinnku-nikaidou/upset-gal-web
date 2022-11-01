import fetch from 'isomorphic-fetch'
type Lang = 'ja' | 'zh' | 'en'

export default async function wikisearch(query: string, lang: Lang = 'zh') {
  const queurl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&srlimit=5`
  console.log(queurl)
  return (await fetch(queurl)).json()
}
