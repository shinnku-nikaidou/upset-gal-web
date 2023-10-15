import { InboxOutlined } from '@ant-design/icons'
import useGlobalTheme from '@utils/persist/theme'
import { Button, Divider, Radio, RadioChangeEvent, Typography } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
import { SketchPicker } from 'react-color'
import type { UploadProps } from 'antd'
const { Text } = Typography

const ThemeProviderMenu = () => {
  const setDirection = useGlobalTheme((state) => state.changeDirection)

  const changeDirection = (e: RadioChangeEvent) => setDirection(e.target.value)

  const color = useGlobalTheme((s) => s.color)
  const changeColor = useGlobalTheme((s) => s.setColor)

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: window.location.origin + '/api/upload/backgroundimage',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        console.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginRight: 16 }}>
          Change direction of components / 改变方向 / تغيير اتجاه المكونات
        </Text>
        <Radio.Group
          defaultValue={useGlobalTheme((s) => s.direction)}
          onChange={changeDirection}
        >
          <Radio.Button key='ltr' value='ltr'>
            LTR
          </Radio.Button>
          <Radio.Button key='rtl' value='rtl'>
            RTL
          </Radio.Button>
        </Radio.Group>
      </div>
      <Divider dashed />
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
      <Divider dashed />
      <div style={{ marginBottom: 16 }}>
        <SketchPicker
          presetColors={['#1890ff', '#25b864', '#ff6f00']}
          color={color}
          onChange={({ hex }) => changeColor(hex)}
        />
        <Text style={{ color: color, marginRight: 16 }}>网站色调</Text>
      </div>
      <Divider dashed />
      <Button
        danger
        onClick={() => {
          localStorage.clear()
          window.location.reload()
        }}
      >
        清除设置(谨慎按下)
      </Button>
    </div>
  )
}

export default ThemeProviderMenu
