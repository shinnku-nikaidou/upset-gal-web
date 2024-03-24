import t from '@lang'
import { Text, Link } from '@chakra-ui/react'
import useGlobalTheme from '@/utils/persist/theme'
import { AccordionItem } from '@nextui-org/react'

export const Feedback = ({ lang }: { lang: string }) => {
  const color = useGlobalTheme((s) => s.color)
  return (
    <AccordionItem key='2' title={t('Feedback', lang)}>
      <Text>
        <span>{t('Click', lang)}</span>
        <Link target='_blank' rel='noreferrer' href='https://t.me/upsetgal'>
          {t('Telegram', lang)}
        </Link>
        <span>{t('Feedback-last', lang)}</span>
      </Text>
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
          href='https://congyu01.top/auth/register?code=e30dc2bc97'
          style={{ color: color }}
        >
          丛雨vpn: 丛雨云
        </Link>
        <span>
          （柚子厨专属vpn, 高速隧道流量, 低延迟, 垃圾网络也能秒开油管4k, 又有
          0.1低倍率流量9元1tb, 注意请使用并收藏最新发布页{' '}
          <Link target='_blank' rel='noreferrer' href='https://congyu.org/'>
            congyu.org
          </Link>{' '}
          ）。
        </span>
        <span>
          或者使用
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://alori.top/index.php#/register?code=N81fWyCw'
          >
            Alori
          </Link>
          , 也是全中转, 高性价比.
        </span>
      </Text>
    </AccordionItem>
  )
}
