import useGlobalTheme from '@utils/persist/theme'
import { Button, Divider, Radio, RadioChangeEvent, Typography } from 'antd'
import { SketchPicker } from 'react-color'
import ImageUploader from './ImageUploader'
import { useEffect } from 'react'
import { getFile } from '@utils/persist/blob'
import DefaultInfoProp from '@utils/userDefaultInfoProp'
import Search, { SearchProps } from 'antd/lib/input/Search'
import { PlusOutlined } from '@ant-design/icons'
const { Text } = Typography

export const isValidURL = (url: string) => {
  const regex =
    /^(https?|http):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|net|org|biz|moe|info|name|pro|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return regex.test(url)
}

const ThemeProviderMenu = (props: DefaultInfoProp) => {
  const setDirection = useGlobalTheme((state) => state.changeDirection)

  const changeDirection = (e: RadioChangeEvent) => setDirection(e.target.value)

  const color = useGlobalTheme((s) => s.color)
  const changeColor = useGlobalTheme((s) => s.setColor)

  useEffect(() => {
    console.log(getFile('backgroundimage'))
  })

  const onSearch: SearchProps['onSearch'] = (value) => {
    const uri = `https://${value}`
    console.log(uri)
    if (isValidURL(uri)) {
      console.log('Looks like a valid URI')
    } else {
      console.log('Not a URI')
    }
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
      <ImageUploader isMobile={props.isMobile} lang={props.lang} />
      <Divider dashed />
      <Search
        addonBefore='https://'
        placeholder='自定义网站背景网址, 请勿重复添加 https:// 头'
        allowClear
        onSearch={onSearch}
        style={{ width: '100%' }}
        enterButton={<PlusOutlined />}
      />
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
