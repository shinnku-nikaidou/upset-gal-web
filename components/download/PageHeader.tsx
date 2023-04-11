import t from '../languages'
import { Header } from 'antd/lib/layout/layout'

export const GalPageHeader = (props: { lang: string }) => (
  <Header>
    <div>
      {t('Head', props.lang)} {t('SubHead', props.lang)}
    </div>
  </Header>
)
