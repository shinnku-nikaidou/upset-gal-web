import { VERSION } from '@const'
import t from '@lang'
import { Box, Text, Link } from '@chakra-ui/react'

export const PageFooter = (props: { lang: string }) => (
  <Box as='footer' textAlign='center' color='gray.500'>
    <Box>Powered by shinnku</Box>
    <Box>
      <Text as='span'>{t('Version', props.lang)}</Text>
      <Text as='span' color='gray.700'>
        {VERSION}
      </Text>
    </Box>
    <Box>
      <Text>
        注：
        <Link
          isExternal
          href='https://github.com/shinnku-nikaidou/upset-gal-web'
          color='teal.500'
        >
          源码
        </Link>
        展示出来仅供参考
      </Text>
    </Box>
  </Box>
)
