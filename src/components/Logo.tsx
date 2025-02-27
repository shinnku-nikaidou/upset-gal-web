

import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@chakra-ui/react'

const Logo = () => {
  const styles = {
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // width: '100%',
      height: '100%',
    },
    responsiveImage: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      width: '100%',
    },
  }

  return (
      <Box as='header' style={styles.imageContainer}>
        <Link href={'/'}>
          <Image
            src='/assets/upsetgal-logo.png'
            alt={`${'失落小站'}, ${'欢迎来到 galgame 分享站点'}`}
            width={1000}
            height={0}
            loading='lazy'
            style={styles.responsiveImage}
          ></Image>
        </Link>
      </Box>
  )
}

export default Logo
