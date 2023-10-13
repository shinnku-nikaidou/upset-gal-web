import Image from 'next/image'
import t from '@lang'

import DefaultInfoProp from '@utils/userDefaultInfoProp'

const Logo = (props: DefaultInfoProp) => {
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
      <Image
        src='/assets/upsetgal-logo.png'
        alt={`${t('Head', props.lang)}, ${t('SubHead', props.lang)}`}
        width={1000}
        height={0}
        style={styles.responsiveImage}
      ></Image>
    </div>
  )
}

export default Logo
