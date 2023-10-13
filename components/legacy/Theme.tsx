import { Button, Divider, Radio, RadioChangeEvent } from 'antd'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ThemeState, Mode } from '@/types/theme'
import { DirectionType } from 'antd/lib/config-provider'

export const useGlobalTheme = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      url: 'default',
      direction: 'ltr',
      hasBGImage: true,
      primaryColor: '',

      changeURL: (newURL: string) =>
        set(() => {
          console.log(`in changeURL, newURL is ${newURL}`)
          return { url: newURL }
        }),

      changeMode: (newMode: Mode) =>
        set(() => {
          console.log(`newMode is ${newMode}`)
          return { mode: newMode }
        }),

      changePrimaryColor: (value: string) =>
        set(() => {
          console.log(`new PrimaryColor is ${value}`)
          return { primaryColor: value }
        }),

      changeDirection: (dir: DirectionType) =>
        set(() => {
          console.log(`new Direction is ${dir}`)
          return { direction: dir }
        }),

      changeBGI: (flag: boolean) => {
        set(() => {
          console.log(`has bgi? ${flag}`)
          return { hasBGImage: flag }
        })
      },
    }),
    {
      name: 'legacy-theme', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)

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
