import { InboxOutlined } from '@ant-design/icons'
import useGlobalTheme from '@utils/persist/theme'
import { Button, Divider, Radio, RadioChangeEvent } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
import { SketchPicker } from 'react-color'

const ThemeProviderMenu = () => {
  const setDirection = useGlobalTheme((state) => state.changeDirection)

  const changeDirection = (e: RadioChangeEvent) => setDirection(e.target.value)

  const color = useGlobalTheme((s) => s.color)
  const changeColor = useGlobalTheme((s) => s.setColor)

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>
          Change direction of components / 改变方向 / تغيير اتجاه المكونات
        </span>
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
      <Dragger
        multiple={false}
        method='post'
        action={window.location.origin + '/upload'}
        // onChange={setBackgroundImage}
      >
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>点击或者拖拽图片到此处以切换背景图片</p>
        <p className='ant-upload-hint'>
          pc端最好上传横屏图片, 手机最好上传竖屏的哦
        </p>
      </Dragger>
      <Divider dashed />
      <div style={{ marginBottom: 16 }}>
        <SketchPicker
          presetColors={['#1890ff', '#25b864', '#ff6f00']}
          color={color}
          onChange={({ hex }) => changeColor(hex)}
        />
        <span style={{ color: color, marginRight: 16 }}>网站色调</span>
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
    </>
  )
}

export default ThemeProviderMenu
