import t from '@lang'
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react'

export const Intro = ({ lang }: { lang: string }) => (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          {t('Intro', lang)}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Text>{t('Intro1', lang)}</Text>
      <Text>{t('Intro2', lang)}</Text>
    </AccordionPanel>
  </AccordionItem>
)
