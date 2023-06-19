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
        ,
        <Link
          target='_blank'
          rel='noreferrer'
          href='https://jq.qq.com/?_wv=1027&k=4aXBpHrh'
        >
          {t('QQ', lang)}
        </Link>
        <span>{t('Feedback-last', lang)}</span>
      </Text>
      <Text>
        <span>
          鉴于交流群日经询问如何翻墙，这里推荐gal玩家(包括本美少女)的专用机场
        </span>
        <Link
          target='_blank'
          rel='noreferrer'
          href='https://alori.moe/index.php#/register?code=N81fWyCw'
        >
          alori（桜花庄）
        </Link>
        <span>
          （节点名字全部都是galgame，都推荐下载玩一遍哦）。
          还有另外一个性价比极高的机场
          <Link
            target='_blank'
            rel='noreferrer'
            href='https://xixiyun.top/#/register?code=wqT1x5ma'
          >
            西西云
          </Link>
          ，9元200gb/19元800gb,推荐都注册使用喵,全都可以无限免费体验。
          使用机场的订阅链接请在这里下载开源的clash客户端，导入订阅链接(clash下载:
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
          )。 全部机场流媒体/chatgpt均解锁。请问在群内发送任何别的机场链接哦。
        </span>
      </Text>
    </Space>
  </Panel>
)
