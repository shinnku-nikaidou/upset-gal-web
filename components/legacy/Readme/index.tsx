import { Intro } from './Intro'
import { Feedback } from './Feedback'
import { Notice } from './Notice'
import { Accordion } from '@nextui-org/react'

export const Readme = ({ lang }: { lang: string; isMobile: boolean }) => (
  <Accordion variant='shadow' defaultExpandedKeys={['1', '2', '3']}>
    {Intro({ lang })}
    {Feedback({ lang })}
    {Notice({ lang })}
  </Accordion>
)
