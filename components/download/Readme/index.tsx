import { Collapse } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'

import { Intro } from './Intro'
import { Feedback } from './Feedback'
import { FAQ } from './FAQ'
import { Notice } from './Notice'

export const Readme = ({ lang }: { lang: string }) => (
  <Collapse
    bordered={false}
    defaultActiveKey={['1', '2']}
    expandIcon={({ isActive }) => (
      <CaretRightOutlined rotate={isActive ? 90 : 0} />
    )}
  >
    {Intro({ lang })}
    {Feedback({ lang })}
    {FAQ({ lang })}
    {Notice({ lang })}
  </Collapse>
)
