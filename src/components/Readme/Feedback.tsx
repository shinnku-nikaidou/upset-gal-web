'use client'

import { Text, Link } from '@chakra-ui/react'
import { AccordionItem } from '@heroui/react'

export const Feedback = () => {
  return (
    <AccordionItem key='2' title={'有关反馈'}>
      <Text>搜索不到请到主页使用日文搜索.</Text>
      <Text>
        最先进的galgame资源论坛, 这里找不到的资源就去那里问, 欢迎来到{' '}
        <Link target='_blank' href={'https://galgame.dev'}>
          真紅の資源討論組
        </Link>
      </Text>
      <Text>
        <span>
          如果发现下载速度慢，或者想来真正的上网冲浪? 真红姐姐推荐使用
        </span>
        <Link
          target='_blank'
          rel='noreferrer'
          href='https://congyu.moe/auth/register?code=e30dc2bc97'
        >
          丛雨vpn: 丛雨云
        </Link>
        <span>
          （柚子厨专属vpn, 高速隧道流量, 低延迟, 垃圾网络也能秒开油管4k,
          注意请使用并收藏最新发布页{' '}
          <Link target='_blank' rel='noreferrer' href='https://congyu.org/'>
            congyu.org
          </Link>{' '}
          ）。
        </span>{' '}
        当然也推荐
        <Link
          target='_blank'
          rel='noreferrer'
          href='https://aa.tutucloud.uk/?path=register&code=p89XrEU5'
        >
          兔兔云
        </Link>
        ，专业vpn.
      </Text>
    </AccordionItem>
  )
}
