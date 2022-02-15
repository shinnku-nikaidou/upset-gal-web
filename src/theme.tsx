import React from "react";
import { SketchPicker } from "react-color";
import { Divider, Radio, Switch, Tooltip } from "antd";
import dark from "./style/index.dark.less";
import light from "./style/index.less";
import compact from "./style/index.compact.less";
import { DirectionType } from "antd/lib/config-provider";

export const backgroundImageNode = document.getElementsByClassName(
  "box"
)[0] as HTMLElement;

const pcDefaultBackgroundImageURL: string =
  "https://shinnku.com/img-original/img/2020/02/07/19/30/04/79335719_p0.jpg";

const mobileDefaultBackgroundImageURL: string =
  "https://shinnku.com/img-original/img/2021/06/18/19/34/21/90638095_p0.jpg";

type ThemeProviderMenuState = {
  bright: boolean;
  color: {
    primaryColor: string;
    errorColor: string;
    warningColor: string;
    successColor: string;
    infoColor: string;
  };
};

const defaultColor = {
  primaryColor: "#1890ff",
  errorColor: "#ff4d4f",
  warningColor: "#faad14",
  successColor: "#52c41a",
  infoColor: "#1890ff",
};

export type Theme = {
  mode: "light" | "dark";
  color: {
    primaryColor: string;
    errorColor: string;
    warningColor: string;
    successColor: string;
    infoColor: string;
  };
  backgroundImage?: string;
  mobile: boolean;
  direction?: DirectionType;
};

export let globalTheme: Theme = {
  mode: "light",
  color: defaultColor,
  mobile: false,
  direction: "ltr",
};

const handleSkin = (bright: boolean) => {
  if (bright) {
    addSkin(light);
  } else {
    addSkin(dark);
  }
};

function addSkin(content: string) {
  let head = document.getElementsByTagName("head")[0];
  const getStyle = head.getElementsByTagName("style");
  if (getStyle.length > 0) {
    for (let i = 0, l = getStyle.length; i < l; i++) {
      if (getStyle[i].getAttribute("data-type") === "theme") {
        getStyle[i].remove();
      }
    }
  }
  let styleDom = document.createElement("style");
  styleDom.dataset.type = "theme";
  styleDom.innerHTML = content;
  head.appendChild(styleDom);
}

export default function initChangeTheme(): any {
  if (globalTheme.mobile) {
    import("../node_modules/antd/dist/antd.compact.css");
    backgroundImageNode.style.backgroundImage = `url(${mobileDefaultBackgroundImageURL})`;
    backgroundImageNode.style.backgroundSize = "cover";
  } else {
    backgroundImageNode.style.backgroundImage = `url(${pcDefaultBackgroundImageURL})`;
    backgroundImageNode.style.backgroundSize = "100%";
  }
  if (globalTheme.mode == "dark") {
    import("../node_modules/antd/dist/antd.dark.css");
  }
}

export class ThemeProviderMenu extends React.Component<
  {},
  ThemeProviderMenuState
> {
  constructor(props: {}) {
    super(props);
    if (globalTheme.mode === "light") {
      this.state = {
        bright: true,
        color: defaultColor,
      };
    } else {
      this.state = {
        bright: false,
        color: defaultColor,
      };
    }
  }

  onColorChange(nextColor: { primaryColor: string }) {
    const mergedNextColor = {
      ...defaultColor,
      ...nextColor,
    };
    this.setState({ color: mergedNextColor });
    globalTheme.color = mergedNextColor;
  }

  changeDirection = (e: any) => {
    const directionValue = e.target.value;
    globalTheme.direction = directionValue;
  };

  render() {
    return (
      <>
        <p>主题目前正在测试中, 使用起来可能会有bug, 现在暂不支持保存设置</p>
        <Divider dashed />
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 16 }}>黑暗/明亮主题切换</span>
          <Tooltip title={`切换${!this.state.bright ? "明亮" : "暗黑"}主题`}>
            <Switch
              checkedChildren={<>🌞</>}
              unCheckedChildren={<>🌜</>}
              defaultChecked={this.state.bright}
              onChange={() => {
                if (this.state.bright) {
                  globalTheme.mode = "dark";
                  this.setState({ bright: false });
                  handleSkin(false);
                } else {
                  globalTheme.mode = "light";
                  this.setState({ bright: true });
                  handleSkin(true);
                }
              }}
            />
          </Tooltip>
        </div>
        <Divider dashed />
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 16 }}>
            Change direction of components / 改变方向 / {"  "} تغيير اتجاه
            المكونات
          </span>
          <Radio.Group defaultValue="ltr" onChange={this.changeDirection}>
            <Radio.Button key="ltr" value="ltr">
              LTR
            </Radio.Button>
            <Radio.Button key="rtl" value="rtl">
              RTL
            </Radio.Button>
          </Radio.Group>
        </div>
        <Divider dashed />

        <Divider dashed />
        <div style={{ marginBottom: 16 }}>
          <SketchPicker
            presetColors={["#1890ff", "#25b864", "#ff6f00"]}
            color={this.state.color.primaryColor}
            onChange={({ hex }: any) => {
              this.onColorChange({
                primaryColor: hex,
              });
            }}
          />
          <span style={{ color: "var(--ant-primary-color)", marginRight: 16 }}>
            {" "}
            网站色调{" "}
          </span>
        </div>
        <Divider dashed />
      </>
    );
  }
}
