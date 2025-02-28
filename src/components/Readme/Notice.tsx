'use client'

import { Text } from '@chakra-ui/react'
import { AccordionItem } from '@heroui/react'

export const Notice = () => (
  <AccordionItem key='3' title={'法律与版权'}>
    <Text>
      '本资源仅供学习交流使用，请务必于下载后 24
      小时内删除，如有能力请购买正版支持。'
    </Text>
    <Text>{'本站不承担任何为此带来的后果。'}</Text>
    <Text>法律を調べて遵守する取り組みは。</Text>
    <Text>
      you are still responsible to research and comply with local laws.
    </Text>
    <Text>{'本公告长期有效。'}</Text>
  </AccordionItem>
)
