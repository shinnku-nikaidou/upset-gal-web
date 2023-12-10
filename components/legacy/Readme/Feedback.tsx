import { Collapse, Space, Typography } from 'antd/lib'
import t from '@lang'

const { Panel } = Collapse
const { Text, Link } = Typography

export const Feedback = ({ lang }: { lang: string }) => (
  <Panel header={t('Feedback', lang)} key='2'>
    <Space direction='vertical'>
      <Text>
        <span>{t('Click', lang)}</span>
        <Link target='_blank' rel='noreferrer' href='https://t.me/upsetgal'>
          {t('Telegram', lang)}
        </Link>
        <span>{t('Feedback-last', lang)}</span>
      </Text>
      <Text>
        <span>
          如果发现网站进不去加载慢，或者下载速度慢，或者想来telegram聊却进不去?
          说明被当地运营商掐网络了，这里推荐
        </span>
        <Link
          target='_blank'
          rel='noreferrer'
          href='https://congyu.moe/auth/register?code=e30dc2bc97'
        >
          丛雨vpn/加速器: 丛雨云
        </Link>
        <span>
          （柚子厨专属vpn, 中转高速流量, 延迟25ms内, 垃圾网络也能秒开油管4k,
          流媒体全解锁, 又有 0.1低倍率流量9元1tb, 性价比之神,
          本站专属循环10%off优惠码:shinnku）。
        </span>
        <span>
          或者使用
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://alori.moe/index.php#/register?code=N81fWyCw'
          >
            Alori
          </Link>
          , 也是全中转, 高性价比
        </span>
      </Text>
    </Space>
  </Panel>
)
