import Image from 'next/image'
import t from '@lang'
import Link from 'next/link'

import DefaultInfoProp from '@utils/userDefaultInfoProp'
import { useFileList } from './LegacyContent'

const Logo = (props: DefaultInfoProp) => {
  const setKey = useFileList().setKey

  const styles = {
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    responsiveImage: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      width: '100%',
    },
  }

  return (
    <div style={styles.imageContainer}>
      <Link href={'/'} onClick={() => setKey(null)}>
        <Image
          src='/assets/upsetgal-logo.png'
          alt={`${t('Head', props.lang)}, ${t('SubHead', props.lang)}`}
          width={1000}
          height={0}
          style={styles.responsiveImage}
        ></Image>
      </Link>
    </div>
  )
}

export default Logo
