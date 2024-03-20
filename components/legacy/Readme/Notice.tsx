import t from '@lang'
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react'

export const Notice = ({ lang }: { lang: string }) => (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          {t('Copyright', lang)}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Text>{t('Right1', lang)}</Text>
      <Text>{t('Right2', lang)}</Text>
      <Text>法律を調べて遵守する取り組みは。</Text>
      <Text>
        you are still responsible to research and comply with local laws.
      </Text>
      <Text>{t('Right3', lang)}</Text>
    </AccordionPanel>
  </AccordionItem>
)
