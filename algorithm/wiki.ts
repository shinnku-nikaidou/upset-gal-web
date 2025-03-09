import Redis from 'ioredis'

import { config } from '@/config/root'
import { WikipediaAnswer } from '@/types/wiki'

/* eslint-disable no-console */
type Lang = 'ja' | 'zh' | 'en'

const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  db: config.redis.database,
})

const emptyanswer = {
  title: '',
  text: '',
}

export async function wikifullsearch(
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
    return emptyanswer
  }
}

export async function wikiredissearch(
  query: string,
  lang: Lang = 'zh',
): Promise<WikipediaAnswer> {
  let pageid: number

  try {
    const ans = await redisClient.get(`cache:search:${query}`)

    console.log(`cache:search:${query}, ans = ${ans}`)
    if (ans) {
      pageid = parseInt(ans, 10)
    } else {
      const queurl = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&srlimit=1`
      const res = await (await fetch(queurl)).json()

      pageid = res['query']['search'][0]['pageid']
      redisClient.set(`cache:search:${query}`, pageid)
    }
  } catch (e) {
    return emptyanswer
  }

  try {
    const ans = await redisClient.hmget(
      `wikipedia:zh:${pageid}`,
      'title',
      'text',
    )

    if (ans[0] && ans[1]) {
      const bg = await redisClient.get(`img:wiki:zh:${pageid}`)
      if (bg) {
        return {
          title: ans[0],
          text: ans[1],
          bg: bg,
        }
      } else
        return {
          title: ans[0],
          text: ans[1],
        }
    } else {
      return emptyanswer
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return emptyanswer
  }
}
