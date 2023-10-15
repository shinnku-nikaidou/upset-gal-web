import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/lib/upload/Dragger'
import { Typography, type UploadProps } from 'antd'
import { saveFile } from '@/utils/persist/blob'

const { Text } = Typography

const ImageUploader: React.FC = () => {
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    // action: window.location.origin + '/api/upload/backgroundimage',
    onChange(info) {
      console.log(info)
      const fileobj = info.file.originFileObj

      if (!fileobj) return

      saveFile(fileobj, 'backgroundimage')
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <Dragger {...props}>
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
