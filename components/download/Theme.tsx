import { useState } from 'react'
import Image from 'next/image'
import {
  Button,
  Divider,
  Radio,
  RadioChangeEvent,
  Switch,
  Tooltip,
  Upload,
  theme,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import create from 'zustand'
import { ThemeState, Mode } from '../../data/interfaces'
import {
  defaultColor,
  mobileDefaultBackgroundImageURL,
  pcDefaultBackgroundImageURL,
} from '../../data/consts'
import ConfigProvider, { DirectionType } from 'antd/lib/config-provider'

const { Dragger } = Upload

export const BgiNode = (props: { isMobile: boolean }) => {
  const url = useGlobalTheme((s) => s.url)

  return (
    <div>
      <Image
        src={(() => {
          if (url === 'default') {
            if (!props.isMobile) return `url(${pcDefaultBackgroundImageURL})`
            else return `url(${mobileDefaultBackgroundImageURL})`
          } else if (url === '') {
            return 'None'
          } else return `url(${url})`
        })()}
        alt={''}
      />
    </div>
  )
}

export const useGlobalTheme = create<ThemeState>((set: (arg0: any) => any) => ({
  mode: 'light',
  url: 'default',
  color: defaultColor,
  direction: 'ltr',
  hasBGImage: true,

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
    set((state: any) => {
      console.log(`new PrimaryColor is ${value}`)
      return { color: { ...state.color, primaryColor: value } }
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
}))

const ThemeProviderMenu = (_props: Record<string, never>) => {
  const _color = useGlobalTheme((state) => state.color)
  const [hasBGImage, setHasBGImage] = useState(
    useGlobalTheme.getState().hasBGImage,
  )
  const setBGImage = useGlobalTheme((s) => s.changeBGI)
  const _setPrimaryColor = useGlobalTheme((state) => state.changePrimaryColor)
  const setDirection = useGlobalTheme((state) => state.changeDirection)
  const setMode = useGlobalTheme((s) => s.changeMode)
  const changeURL = useGlobalTheme((state) => state.changeURL)
  const changeDirection = (e: RadioChangeEvent) => setDirection(e.target.value)
  const changeMode = (mode: boolean) => setMode(mode ? 'light' : 'dark')

  const setBackgroundImage = (info: UploadChangeParam<UploadFile>) => {
    const { status } = info.file
    console.log(`status = ${status}`)
    if (status === 'done') {
      const _res: string = info.file.response
      // storage.setItem("BGImageURL", res);
      console.log(`${info.file.name} file uploaded successfully.`)
      setTimeout(() => changeURL('default'), 1000)
    } else if (status === 'error') {
      console.error(`${info.file.name} file upload failed.`)
    }
  }

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>开关背景按钮</span>
        <Tooltip title={`点击${hasBGImage ? '关闭' : '打开'}背景图`}>
          <Switch
            checkedChildren='开'
            unCheckedChildren='关'
            defaultChecked={!hasBGImage}
            onChange={() => {
              if (hasBGImage) {
                setBGImage(false)
                setHasBGImage(false)
                changeURL('')
              } else {
                setBGImage(true)
                setHasBGImage(true)
                changeURL('default')
              }
            }}
          />
        </Tooltip>
      </div>
      <Divider dashed />
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>黑暗/明亮主题切换</span>
        <Tooltip
          title={`点击切换${
            useGlobalTheme((s) => s.mode) == 'light' ? '暗黑' : '明亮'
          }主题`}
        >
          <Switch
            checkedChildren='🌞'
            unCheckedChildren='🌜'
            defaultChecked={
              useGlobalTheme((s) => s.mode) == 'light' ? true : false
            }
            onChange={changeMode}
          />
        </Tooltip>
      </div>
      <Divider dashed />
      <Dragger
        multiple={false}
        method='post'
        action={'/upload'}
        onChange={setBackgroundImage}
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
        清除设置(谨慎操作)
      </Button>
    </>
  )
}

export default ThemeProviderMenu
