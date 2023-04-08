import { Collapse, Space, Typography } from 'antd'
import t from '../../languages'

const { Panel } = Collapse
const { Text, Link } = Typography

export const Feedback = ({ lang }: { lang: string }) => (
  <Panel header={t('Feedback', lang)} key='2'>
    <Space direction='vertical'>
      <Text>
        <span>{t('Click', lang)}</span>
        <Link target='_blank' rel='noreferrer' href='https://t.me/upsetGroup'>
          {t('Telegram', lang)}
        </Link>
        <span>{t('Feedback-last', lang)}</span>
      </Text>
      <Text>
        <span>
          鉴于每天都有人在tg群询问在国内如何使用梯子/vpn/翻墙事宜，这里推荐本站长（是真的喜欢gal的可爱美少女喵）自用机场（顺便恰饭）
        </span>
        <Link
          target='_blank'
          rel='noreferrer'
          href='https://xixiyun.top/#/register?code=wqT1x5ma'
        >
          西西云
        </Link>
        <span>
          。一个月9元200gb/19元800gb吃到饱流量。
          使用机场的订阅链接请在这里下载开源的clash客户端（第一次听说的请自行搜索clash是什么）导入订阅链接(
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://shinnku.us/Clash.for.Windows-0.20.20-win.7z'
          >
            win
          </Link>
          ), (
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://shinnku.us/cfa-2.5.12-premium-universal-release.apk'
          >
            安卓
          </Link>
          ) 点击下载软件。
          {/* , 当然还有另一个非常好用的机场
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://oukasou.moe/index.php#/register?code=N81fWyCw'
          >
            樱花庄
          </Link>
          喵，推荐都注册使用喵。 */}
        </span>
      </Text>
    </Space>
  </Panel>
)
