import { useState, useRef } from "react";
import {
  Button,
  Divider,
  Radio,
  RadioChangeEvent,
  Switch,
  Tooltip,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import create from "zustand";
import { persist } from 'zustand/middleware';
import { ThemeState, Mode, BGIState } from "./data/interfaces";
import { DirectionType } from "antd/es/config-provider";

const { Dragger } = Upload;
export const bgiNode = document.getElementById("bgi") as HTMLElement;

// mobile is prop not state, so do not move it to GlobalTheme
let mobile = true;
export function getMobile() {
  return mobile;
}
export const isMobile = (existsAgent: boolean) => {
  console.log(`find this device is ${existsAgent} mobile`);
  mobile = existsAgent
};

const pcDefaultBackgroundImageURL: string =
  "https://shinnku.com/img-original/img/2020/02/07/19/30/04/79335719_p0.jpg";

const mobileDefaultBackgroundImageURL: string =
  "https://shinnku.com/img-original/img/2021/06/18/19/34/21/90638095_p0.jpg";

const defaultColor = {
  primaryColor: "#1890ff",
  errorColor: "#ff4d4f",
  warningColor: "#faad14",
  successColor: "#52c41a",
  infoColor: "#1890ff",
};

export const useImageURL = create<BGIState>((set: Function) => ({
  url: "default",
  changeURL: (newURL: string) => set(() => {
    console.log(`in changeURL, newURL is ${newURL}`)
    if (newURL === "default") {
      if (!getMobile())
        bgiNode.style.backgroundImage = `url(${pcDefaultBackgroundImageURL})`;
      else bgiNode.style.backgroundImage = `url(${mobileDefaultBackgroundImageURL})`;
    } else if (newURL === "") {
      bgiNode.style.backgroundImage = 'None';
    }
    return ({ url: newURL })
  })
}));


export const useGlobalTheme = create<ThemeState>((set: Function) => ({
  mode: "light",
  changeMode: (newMode: Mode) => set((state: ThemeState) => {
    console.log(`I change ${newMode}`)
    if (state.mode == "dark") { import('../node_modules/antd/dist/antd.dark.less') };
    return ({ mode: newMode })
  }),
  color: defaultColor,
  changePrimaryColor: (value: string) =>
    set((state: any) => ({ color: { ...state.color, primaryColor: value } })),
  direction: "ltr",
  changeDirection: (dir: DirectionType) => { set(() => ({ direction: dir })) },
  hasBGImage: true,
  isUploadBGI: (flag: boolean) => {
    set(() => ({ hasBGImage: flag }))
  }
}));

export default function initChangeTheme(): void {
  const globalTheme = useGlobalTheme.getState();
  if (getMobile()) {
    import("../node_modules/antd/dist/antd.compact.css");
    bgiNode.style.backgroundSize = "cover";
  } else {
    bgiNode.style.backgroundSize = "100%";
  }

  console.log(globalTheme);
  if (globalTheme.hasBGImage) {
    // changeURL("")
  }
}

export const ThemeProviderMenu = (props: {}) => {
  const color = useGlobalTheme((state) => state.color);
  const [hasBGImage, setHasBGImage] = useState(useGlobalTheme.getState().hasBGImage);
  const setPrimaryColor = useGlobalTheme((state) => state.changePrimaryColor);
  const setDirection = useGlobalTheme((state) => state.changeDirection);
  const setMode = useGlobalTheme((s) => s.changeMode);
  const changeURL = useImageURL((state) => state.changeURL)
  const changeDirection = (e: RadioChangeEvent) => setDirection(e.target.value);
  const changeMode = (mode: boolean) => setMode(mode ? "light" : "dark");

  const setBackgroundImage = (info: UploadChangeParam<UploadFile>) => {
    const { status } = info.file;
    console.log(`status = ${status}`);
    if (status === "done") {
      const res: string = info.file.response;
      // storage.setItem("BGImageURL", res);
      console.log(`${info.file.name} file uploaded successfully.`);
      setTimeout(() => changeURL("default"), 1000);
    } else if (status === "error") {
      console.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>开关背景按钮</span>
        <Tooltip title={`点击${hasBGImage ? "关闭" : "打开"}背景图`}>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked={!hasBGImage}
            onChange={() => {
              if (hasBGImage) {
                setHasBGImage(false);
                changeURL("");
              } else {
                setHasBGImage(true);
                changeURL("default");
              }
            }
            }
          />
        </Tooltip>
      </div>
      <Divider dashed />
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>黑暗/明亮主题切换</span>
        <Tooltip title={`点击切换${useGlobalTheme(s => s.mode) == "light" ? "暗黑" : "明亮"}主题`}>
          <Switch
            checkedChildren="🌞"
            unCheckedChildren="🌜"
            defaultChecked={useGlobalTheme(s => s.mode) == "light" ? true : false}
            onChange={changeMode}
          />
        </Tooltip>
      </div>
      <Divider dashed />
      <Dragger
        multiple={false}
        method="post"
        action={window.location.origin + "/upload"}
        onChange={setBackgroundImage}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者拖拽图片到此处以切换背景图片</p>
        <p className="ant-upload-hint">
          pc端最好上传横屏图片, 手机最好上传竖屏的哦
        </p>
      </Dragger>
      <Divider dashed />
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>
          Change direction of components / 改变方向 / تغيير اتجاه المكونات
        </span>
        <Radio.Group
          defaultValue={useGlobalTheme(s => s.direction)}
          onChange={changeDirection}
        >
          <Radio.Button key="ltr" value="ltr">
            LTR
          </Radio.Button>
          <Radio.Button key="rtl" value="rtl">
            RTL
          </Radio.Button>
        </Radio.Group>
      </div>
      <Divider dashed />
      <Button
        danger
        onClick={() => {
          window.location.reload();
        }}
      >
        清除设置(谨慎操作)
      </Button>
      <Divider dashed />
      {/* <div style={{ marginBottom: 16 }}>
        <SketchPicker
          presetColors={["#1890ff", "#25b864", "#ff6f00"]}
          color={color.primaryColor}
          onChange={({ hex }: any) => onColorChange(hex)}
        />
        <span style={{ color: color.primaryColor, marginRight: 16 }}>
          网站色调
        </span>
      </div>
      <Divider dashed /> */}
    </>
  );
};
