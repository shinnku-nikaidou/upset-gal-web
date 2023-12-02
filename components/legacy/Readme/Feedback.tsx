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
          网站架设在香港, 遵守香港本土法律, 由于最近境内处于严打状态,
          为了保持存活, 我们不得不关闭一切境内通讯软件的入口, 请您理解
        </span>
      </Text>
      <Text>
        <span>
          小站正在紧急整理所有已故终点的galgame, 预计12月底左右将会上架网站,
          预计超过10tb内容(当然会有一堆重复的, 真红姐姐懒得去重了).
        </span>
      </Text>
      <Text>
        <span>
          小站正在新增psp分类, 不止galgame, 也有很多别的游戏, psp模拟器三端可用,
          自行google搜索研究使用,预估有3.3 TB 内容.
        </span>
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
          （柚子厨专属vpn, 中转高速流量, 延迟25ms内, 垃圾网络秒开4k,
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
