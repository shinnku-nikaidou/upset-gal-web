import Header from 'antd/lib/layout/layout'
import Image from 'next/image'
import t from '../languages'
// import Title from 'antd/lib/typography/Title'
// import Text from 'antd/lib/typography/Text'

export const GalPageHeader = (props: { lang: string }) => {
  return (
    <Header
      className='header'
      style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}
    >
      <div
        style={{
          float: 'left',
          width: 120,
          height: 31,
          margin: '16px 24px 16px 0',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      ></div>
      <Image
        src='/assets/upsetgal-logo.png'
        alt={`${t('Head', props.lang)}, ${t('SubHead', props.lang)}`}
        width={200}
        height={500}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></Image>
    </Header>
  )
}
