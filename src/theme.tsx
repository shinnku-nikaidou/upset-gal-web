// TODO: refactor this file

import { useState } from "react";
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
import { Theme } from "./data/interfaces";

let storage = localStorage;

const { Dragger } = Upload;
export const backgroundImageNode = document.getElementsByClassName(
  "box"
)[0] as HTMLElement;

export function changeBackgroundImage(url: string) {
  if (url === "") {
    console.log("change to no image");
    backgroundImageNode.style.backgroundImage = "none";
  } else if (url === "default") {
    if (storage.hasOwnProperty("BGImageURL")) {
      const url = storage.getItem("BGImageURL") as string;
      changeBackgroundImage(window.location.origin + "/pictures/" + url);
    } else {
      if (globalTheme.mobile) {
        changeBackgroundImage(mobileDefaultBackgroundImageURL);
      } else {
        changeBackgroundImage(pcDefaultBackgroundImageURL);
      }
    }
  } else {
    console.log(`change to ${url} image`);
    backgroundImageNode.style.backgroundImage = `url(${url})`;
  }
}

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

export let globalTheme: Theme = {
  // mode: "light",
  color: defaultColor,
  mobile: false,
  direction: "ltr",
  hasBGImage: true,
};

export const useGlobalTheme = create((set: Function) => ({
  mode: "light",
  color: defaultColor,
  changePrimaryColor: (value: string) =>
    set((state: any) => ({ color: { ...state.color, primaryColor: value } })),
  mobile: false,
  direction: "ltr",
  changeDirection: (dir: string) => set(() => ({ direction: dir })),
  hasBGImage: true,
  changeTheme: (newValue: Theme) =>
    set((state: any) => ({ ...state, ...newValue })),
}));

export default function initChangeTheme(): any {
  if (globalTheme.mobile) {
    import("../node_modules/antd/dist/antd.compact.css");
    backgroundImageNode.style.backgroundSize = "cover";
  } else {
    backgroundImageNode.style.backgroundSize = "100%";
  }
  // if (globalTheme.mode == "dark") {
  // }

  if (globalTheme.hasBGImage) {
    setTimeout(() => changeBackgroundImage("default"), 1000);
  }
}

export const ThemeProviderMenu = (props: {}) => {
  const color = useGlobalTheme((state) => state.color);
  const [hasBGImage, setHasBGImage] = useState(globalTheme.hasBGImage);
  const setPrimaryColor = useGlobalTheme((set) => set.changePrimaryColor);
  const setDirection = useGlobalTheme((state) => state.changeDirection);

  const changeDirection = (e: RadioChangeEvent) => {
    const directionValue = e.target.value;
    setDirection(directionValue);
    storage.setItem("direction", directionValue);
  };

  const setBackgroundImage = (info: UploadChangeParam<UploadFile>) => {
    const { status } = info.file;
    console.log(`status = ${status}`);
    if (status === "done") {
      const res: string = info.file.response;
      storage.setItem("BGImageURL", res);
      console.log(`${info.file.name} file uploaded successfully.`);
      setTimeout(() => changeBackgroundImage("default"), 1000);
    } else if (status === "error") {
      console.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <>
      <p>主题目前正在开发中, 使用起来可能会有bug, 主题会自动保存</p>
      <Divider dashed />
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>开关背景按钮</span>
        <Tooltip title={`点击${hasBGImage ? "关闭" : "打开"}背景图`}>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            defaultChecked={!hasBGImage}
            onChange={() => {
              if (hasBGImage) {
                globalTheme.hasBGImage = false;
                storage.setItem("hasBGImage", "false");
                setHasBGImage(false);
                changeBackgroundImage("");
              } else {
                globalTheme.hasBGImage = true;
                storage.setItem("hasBGImage", "true");
                setHasBGImage(true);
                changeBackgroundImage("default");
              }
            }}
          />
        </Tooltip>
      </div>
      <Divider dashed />
      {/* <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 16 }}>黑暗/明亮主题切换</span>
        <Tooltip title={`点击切换${bright ? "暗黑" : "明亮"}主题`}>
          <Switch
            checkedChildren="🌞"
            unCheckedChildren="🌜"
            defaultChecked={bright}
            onChange={() => {
              if (bright) {
                globalTheme.mode = "dark";
                storage.setItem("mode", "dark");
                setBright(false);
                handleSkin(false);
              } else {
                globalTheme.mode = "light";
                storage.setItem("mode", "light");
                setBright(true);
                handleSkin(true);
              }
            }}
          />
        </Tooltip>
      </div>
      <Divider dashed /> */}
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
          defaultValue={useGlobalTheme((state) => state.direction)}
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
          storage.clear();
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
