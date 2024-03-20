import { Collapse } from 'antd/lib'
import { CaretRightOutlined } from '@ant-design/icons'

import { Intro } from './Intro'
import { Feedback } from './Feedback'
import { Notice } from './Notice'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'

export const Readme = ({
  lang,
  isMobile,
}: {
  lang: string
  isMobile: boolean
}) => (
  <>
    <Accordion defaultIndex={isMobile ? [2] : [1, 2, 3]} allowMultiple>
      {Intro({ lang })}
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Collapse
      bordered={false}
      defaultActiveKey={isMobile ? ['2'] : ['1', '2', '3']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      {Feedback({ lang })}
      {Notice({ lang })}
    </Collapse>
  </>
)
