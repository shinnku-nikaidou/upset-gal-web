import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
import { Typography, type UploadProps } from 'antd'
import { saveFile } from '@utils/persist/blob'
import useGlobalTheme from '@/utils/persist/theme'
import useBackGroundNode, {
  setBackgroundImage,
} from '@/utils/persist/background'
import DefaultInfoProp from '@/utils/userDefaultInfoProp'

const { Text } = Typography

const ImageUploader: React.FC<DefaultInfoProp> = (props: DefaultInfoProp) => {
  const changeURL = useGlobalTheme((s) => s.changeURL)
  const node = useBackGroundNode((s) => s.node)

  const draggerprops: UploadProps = {
    name: 'file',
    multiple: true,
    // action: window.location.origin + '/api/upload/backgroundimage',
    onChange(info) {
      console.log(info)
      const fileobj = info.file.originFileObj

      if (!fileobj) return

      saveFile(fileobj, 'backgroundimage')
      changeURL('local')
      setTimeout(() => {
        setBackgroundImage('local', props.isMobile, node)
      })
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <Dragger {...draggerprops}>
      <p className='ant-upload-drag-icon'>
        <InboxOutlined />
      </p>
      <Text className='ant-upload-text'>
        点击或者拖拽图片到此处以切换背景图片
      </Text>
      <Text className='ant-upload-hint'>
        pc端最好上传横屏图片, 手机最好上传竖屏的哦
      </Text>
    </Dragger>
  )
}

export default ImageUploader
