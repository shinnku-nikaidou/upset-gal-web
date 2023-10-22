import useGlobalTheme from '@utils/persist/theme'
import { Button, Divider, Radio, RadioChangeEvent, Typography } from 'antd'
import { SketchPicker } from 'react-color'
import ImageUploader from './ImageUploader'
import { useEffect } from 'react'
import { getFile } from '@utils/persist/blob'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import Search, { SearchProps } from 'antd/lib/input/Search'
import { PlusOutlined } from '@ant-design/icons'
import useBackGroundNode, {
  setBackgroundImage,
} from '@utils/persist/background'
import { isValidURL } from '@utils/algorithms/isValidURL'
const { Text } = Typography

const ThemeProviderMenu = (props: DefaultInfoProp) => {
  const setDirection = useGlobalTheme((state) => state.changeDirection)

  const changeDirection = (e: RadioChangeEvent) => setDirection(e.target.value)

  const { color, setColor, url, changeURL } = useGlobalTheme()

  const node = useBackGroundNode((s) => s.node)

  useEffect(() => {
    console.log(getFile('backgroundimage'))
  })

  const onSearch: SearchProps['onSearch'] = (value) => {
    const uri = `https://${value}`
    console.log(uri)
    if (isValidURL(uri)) {
      console.log('Looks like a valid URI')
      changeURL(uri)
      setBackgroundImage(uri, props.isMobile, node)
    } else {
      console.log('Not a URI')
    }
  }

  const onChangeBGIButtun = (e: RadioChangeEvent) => {
    const v: string = e.target.value
    console.log(v)
    changeURL(v)
    setBackgroundImage(v, props.isMobile, node)
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text style={{ marginRight: 16 }}>
          Change direction of components / 改变方向
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
      <Search
        addonBefore='https://'
        placeholder={
          isValidURL(url)
            ? url.substring(8)
            : '自定义网站背景网址, 请勿重复添加 https:// 头'
        }
        allowClear
        onSearch={onSearch}
        style={{ width: '100%' }}
        enterButton={<PlusOutlined />}
      />
      <Divider dashed />
      <Radio.Group value={url} onChange={onChangeBGIButtun}>
        <Radio.Button value='default'>默认背景</Radio.Button>
        <Radio.Button value='local'>自行上传</Radio.Button>
        <Radio.Button value=''>清除背景</Radio.Button>
      </Radio.Group>
      <Divider dashed />
      <div style={{ marginBottom: 16 }}>
        <SketchPicker
          presetColors={['#1890ff', '#25b864', '#ff6f00']}
          color={color}
          onChange={({ hex }) => setColor(hex)}
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
