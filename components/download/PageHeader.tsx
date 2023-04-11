import Header from 'antd/lib/layout'
import t from '../languages'

export const GalPageHeader = (props: { lang: string }) => (
  <Header>
    <div>
      {t('Head', props.lang)} {t('SubHead', props.lang)}
    </div>
  </Header>
)
