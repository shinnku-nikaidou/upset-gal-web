import { Intro } from './Intro'
import { Feedback } from './Feedback'
import { Notice } from './Notice'
import { Accordion } from '@chakra-ui/react'

export const Readme = ({
  lang,
  isMobile,
}: {
  lang: string
  isMobile: boolean
}) => (
  <Accordion defaultIndex={isMobile ? [2] : [1, 2, 3]} allowMultiple>
    {Intro({ lang })}
    {Feedback({ lang })}
    {Notice({ lang })}
  </Accordion>
)
