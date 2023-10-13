import useGlobalTheme from '@utils/persist/theme'
import { Button, Divider, Radio, RadioChangeEvent } from 'antd'


const ThemeProviderMenu = () => {
  const setDirection = useGlobalTheme((state) => state.changeDirection)
  const changeDirection = (e: RadioChangeEvent) => setDirection(e.target.value)

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
      <Button
        danger
        onClick={() => {
          window.location.reload()
        }}
      >
        刷新
      </Button>
    </>
  )
}

export default ThemeProviderMenu
