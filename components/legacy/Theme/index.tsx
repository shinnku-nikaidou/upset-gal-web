import useGlobalTheme from '@utils/persist/theme'
import { Button, Divider, Radio, RadioChangeEvent, Typography } from 'antd'
import { SketchPicker } from 'react-color'
import ImageUploader from './ImageUploader'
import { useEffect } from 'react'
import { getFile } from '@utils/persist/blob'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
const { Text } = Typography

const ThemeProviderMenu = (props: DefaultInfoProp) => {
  const setDirection = useGlobalTheme((state) => state.changeDirection)

  const changeDirection = (e: RadioChangeEvent) => setDirection(e.target.value)

  const color = useGlobalTheme((s) => s.color)
  const changeColor = useGlobalTheme((s) => s.setColor)

  useEffect(() => {
    console.log(getFile('backgroundimage'))
  })

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
      <ImageUploader isMobile={props.isMobile} lang={props.lang} />
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
