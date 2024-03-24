import { useState } from 'react'
import { Card, Button, CardBody } from '@nextui-org/react'
import { Text } from '@chakra-ui/react'
import { saveFile } from '@/utils/persist/blob'
import useBackGroundNode, {
  setBackgroundImage,
} from '@/utils/persist/background'
import useGlobalTheme from '@/utils/persist/theme'

interface DefaultInfoProp {
  isMobile: boolean
  lang: string
}

const ImageUploader: React.FC<DefaultInfoProp> = (props: DefaultInfoProp) => {
  const node = useBackGroundNode((s) => s.node)
  const changeURL = useGlobalTheme((s) => s.changeURL)
  const [dragging, setDragging] = useState<boolean>(false)

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    console.log('Dropped files', e.dataTransfer.files)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileobj: File = e.dataTransfer.files[0]
      console.log('Selected file', fileobj)
      saveFile(fileobj, 'backgroundimage')
      changeURL('local')
      setTimeout(() => {
        setBackgroundImage('local', props.isMobile, node)
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileobj: File = e.target.files[0]
      console.log('Selected file', fileobj)
      saveFile(fileobj, 'backgroundimage')
      changeURL('local')
      setTimeout(() => {
        setBackgroundImage('local', props.isMobile, node)
      })
    }
  }

  return (
    <Card
      style={{
        padding: '$10',
        backgroundColor: dragging ? '$accents2' : '$background',
        border: dragging ? '2px dashed $primary' : '1px solid $border',
        transition: 'background-color 0.2s ease',
      }}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <CardBody
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>点击或者拖拽图片到此处以切换背景图片</Text>
        <Text>pc端最好上传横屏图片, 手机最好上传竖屏的哦</Text>
        <Button as='label' color='primary'>
          选择文件
          <input
            type='file'
            multiple
            style={{ display: 'none' }}
            onChange={handleChange}
          />
        </Button>
      </CardBody>
    </Card>
  )
}

export default ImageUploader
