import { Collapse, Space, Typography } from 'antd'
import t from '@lang'

const { Panel } = Collapse
const { Text, Link } = Typography

export const Feedback = ({ lang }: { lang: string }) => (
  <Panel header={t('Feedback', lang)} key='2'>
    <Space direction='vertical'>
      <Text>
        <span>{t('Click', lang)}</span>
        <Link
          target='_blank'
          rel='noreferrer'
          href='https://qm.qq.com/q/EKWa8Vo9Dq'
        >
          {t('QQ', lang)}
        </Link>
        {',\n'}
        <Link target='_blank' rel='noreferrer' href='https://t.me/upsetgal'>
          {t('Telegram', lang)}
        </Link>
        <span>{t('Feedback-last', lang)}</span>
      </Text>
      <Text>
        <span>网站架设在香港, 遵守香港本土法律</span>
      </Text>
      <Text>
        <span>
          网站的新服务器是来自丛雨大人捐赠, 如果您觉得网站加载速度令人满意,
          那这里推荐
        </span>
        <Link
          target='_blank'
          rel='noreferrer'
          href='https://congyu.moe/auth/register?code=e30dc2bc97'
        >
          丛雨vpn: 丛雨云
        </Link>
        <span>
          （柚子社专属机场, 既有iepl专线高速流量, 延迟25ms内,
          游戏延迟超越uu加速器 又有低倍率流量让你能19块钱用1tb, 性价比之神）。
          使用机场的订阅链接请在这里下载开源的clash客户端，导入订阅链接(已经绝版的clash下载链接:
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://shinnku.us/Clash.for.Windows.Setup.0.20.25.exe'
          >
            win
          </Link>
          ，
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://shinnku.us/cfa-2.5.12-premium-universal-release.apk'
          >
            安卓
          </Link>
          当然 clash 已经停止维护了, 你也可以使用 v2ray, 请github自行搜索 )。
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
