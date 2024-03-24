import useGlobalTheme from '@utils/persist/theme'
import { SketchPicker } from 'react-color'
import ImageUploader from './ImageUploader'
import { useEffect } from 'react'
import { getFile } from '@utils/persist/blob'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import useBackGroundNode, {
  setBackgroundImage,
} from '@utils/persist/background'
import { Button, ButtonGroup, Divider } from '@nextui-org/react'
import { Text } from '@chakra-ui/react'

const ThemeProviderMenu = (props: DefaultInfoProp) => {
  const { color, setColor, changeURL } = useGlobalTheme()
  const node = useBackGroundNode((s) => s.node)

  useEffect(() => {
    console.log(getFile('backgroundimage'))
  })

  const onChangeBGIButtun = (v: string) => {
    console.log(v)
    changeURL(v)
    setBackgroundImage(v, props.isMobile, node)
  }

  return (
    <div>
      <ImageUploader isMobile={props.isMobile} lang={props.lang} />
      <Divider />
      <ButtonGroup color='primary'>
        <Button onClick={() => onChangeBGIButtun('default')}>默认背景</Button>
        <Button onClick={() => onChangeBGIButtun('local')}>自行上传</Button>
        <Button onClick={() => onChangeBGIButtun('')}>清除背景</Button>
      </ButtonGroup>
      <Divider />
      <div style={{ marginBottom: 16 }}>
        <SketchPicker
          presetColors={['#1890ff', '#25b864', '#ff6f00']}
          color={color}
          onChange={({ hex }) => setColor(hex)}
        />
        <Text style={{ color: color, marginRight: 16 }}>网站色调</Text>
      </div>
      <Divider />
      <Button
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
