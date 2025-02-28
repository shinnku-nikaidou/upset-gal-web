'use client'

import { Intro } from './Intro'
import { Feedback } from './Feedback'
import { Notice } from './Notice'
import { Accordion } from '@heroui/react'

export const Readme = () => (
  <Accordion
    variant='shadow'
    selectionMode='multiple'
    defaultExpandedKeys={['1', '2', '3']}
  >
    {Intro()}
    {Feedback()}
    {Notice()}
  </Accordion>
)
