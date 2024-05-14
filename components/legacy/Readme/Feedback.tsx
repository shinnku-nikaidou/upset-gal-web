import t from '@lang'
import { Text, Link } from '@chakra-ui/react'
import useGlobalTheme from '@/utils/persist/theme'
import { AccordionItem } from '@nextui-org/react'
import { ad2Url, adUrl } from '@/const'

export const Feedback = ({ lang }: { lang: string }) => {
  const color = useGlobalTheme((s) => s.color)
  return (
    <AccordionItem key='2' title={t('Feedback', lang)}>
      <Text>搜索不到请到主页使用日文搜索.</Text>
      <Text>
        最先进的galgame资源论坛, 这里找不到的资源就去那里问, 欢迎来到{' '}
        <Link
          target='_blank'
          href={'https://galgame.dev'}
          style={{ color: color }}
        >
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
          style={{ color: color }}
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
          style={{ color: color }}
        >
          兔兔云
        </Link>
        ，专业vpn, 内含唯云专线, 依旧性价比高到可怕。
      </Text>
      <Text>
        <span>
          {' '}
          茶茶丸电动飞机杯, 仿真内道粘膜圈口褶皱！电动功能让你体验真空吮吸快感
          <Link
            target='_blank'
            rel='noreferrer'
            href={adUrl}
            style={{ color: color }}
          >
            {' '}
            优惠券{' '}
          </Link>
          购买,{' '}
          <Link target='_blank' rel='noreferrer' href={ad2Url}>
            查看详细测评
          </Link>
        </span>
        。
      </Text>
    </AccordionItem>
  )
}
