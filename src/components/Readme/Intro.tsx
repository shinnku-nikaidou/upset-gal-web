'use client'

import { AccordionItem } from '@heroui/react'
import { Text } from '@chakra-ui/react'

export const Intro = () => (
  <AccordionItem key='1' title={'简介'}>
    <Text>
      {
        '这是失落小站, 一个galgame资源站, (包括visual novel, 黄油, psp, krkr, ons gal资源 等), 收录了大部分的汉化galgame, 大部分的生肉galgame资源。'
      }
    </Text>
    <Text>
      {
        '有在 Windows 电脑上面运行的，krkr 和 ons 是手机版，需要进入模拟器页面下载专属的模拟器解压再运行。'
      }
    </Text>
    <Text>
      {'如果没有汉化版本, 可以先下载生肉, 之后在 vndb.org 等网站寻找汉化补丁'}
    </Text>
  </AccordionItem>
)
