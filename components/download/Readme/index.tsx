import { Collapse } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'

import { Intro } from './Intro'
import { Feedback } from './Feedback'
import { FAQ } from './FAQ'
import { Notice } from './Notice'
import Image from 'next/image'
import t from '../../languages'
export const Readme = ({ lang }: { lang: string }) => (
  <>
    <Image
      src='/assets/upsetgal-logo.png'
      alt={`${t('Head', lang)}, ${t('SubHead', lang)}`}
      width={300}
      height={1000}
      style={{
        display: 'block',
        margin: '0 auto',
        // transform: 'translate(-50%, -50%)',
      }}
    ></Image>
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
  </>
)
