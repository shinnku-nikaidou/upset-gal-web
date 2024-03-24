import t from '@lang'
import { Text } from '@chakra-ui/react'
import { AccordionItem } from '@nextui-org/react'

export const Notice = ({ lang }: { lang: string }) => (
  <AccordionItem key='3' title={t('Copyright', lang)}>
    <Text>{t('Right1', lang)}</Text>
    <Text>{t('Right2', lang)}</Text>
    <Text>法律を調べて遵守する取り組みは。</Text>
    <Text>
      you are still responsible to research and comply with local laws.
    </Text>
    <Text>{t('Right3', lang)}</Text>
  </AccordionItem>
)
