import t from '@lang'
import { AccordionItem } from '@nextui-org/react'
import { Text } from '@chakra-ui/react'

export const Intro = ({ lang }: { lang: string }) => (
  <AccordionItem key='1' title={t('Intro', lang)}>
    <Text>{t('Intro1', lang)}</Text>
    <Text>{t('Intro2', lang)}</Text>
    <Text>{t('Intro3', lang)}</Text>
  </AccordionItem>
)
