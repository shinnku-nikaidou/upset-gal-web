import { Collapse } from 'antd/lib'
import { CaretRightOutlined } from '@ant-design/icons'

import { Intro } from './Intro'
import { Feedback } from './Feedback'
import { Notice } from './Notice'

export const Readme = ({
  lang,
  isMobile,
}: {
  lang: string
  isMobile: boolean
}) => (
  <>
    <Collapse
      bordered={false}
      defaultActiveKey={isMobile ? ['2'] : ['1', '2', '3']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      {Intro({ lang })}
      {Feedback({ lang })}
      {Notice({ lang })}
    </Collapse>
  </>
)
