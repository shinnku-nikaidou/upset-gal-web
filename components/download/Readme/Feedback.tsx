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
          {' '}
          鉴于每天都有人在tg群询问梯子事宜（顺便恰饭），这里推荐一个站长（可爱美少女）自用机场{' '}
        </span>
        <Link
          target='_blank'
          rel='noreferrer'
          href='https://xixiyun.top/#/register?code=wqT1x5ma'
        >
          西西云
        </Link>
        <span> 。已经和机场主达成合作协议了。 </span>
      </Text>
    </Space>
  </Panel>
)
