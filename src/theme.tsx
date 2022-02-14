import React from "react";
import { Divider, Switch, Tooltip } from "antd";
import { getisPC } from "./config";
import dark from "./style/index.dark.less";
import light from "./style/index.less";

export type Theme = {
  mode: "light" | "dark";
};

export let globalTheme: Theme = {
  mode: "light",
};

const handleSkin = (checked: boolean) => {
  if (checked) {
    // 明亮主题
    addSkin(light);
  } else {
    // 暗色主题
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

export default function changeTheme(): any {
  if (!getisPC()) {
    import("antd/dist/antd.compact.css");
  }
  if (globalTheme.mode == "dark") {
    handleSkin(false);
  }
}

type ThemeProviderMenuState = {
  dark: boolean;
};

export class ThemeProviderMenu extends React.Component<
  {},
  ThemeProviderMenuState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dark: true,
    };
  }

  render() {
    return (
      <>
        <p>主题测试中, 可能会有bug.</p>
        <Divider dashed />
        <Tooltip title={`切换${!this.state.dark ? "明亮" : "暗黑"}主题`}>
          <Switch
            checkedChildren={<>🌞</>}
            unCheckedChildren={<>🌜</>}
            defaultChecked={this.state.dark}
            onChange={() => {
              if (this.state.dark) {
                globalTheme.mode = "dark";
                this.setState({ dark: false });
                handleSkin(false);
              } else {
                globalTheme.mode = "light";
                this.setState({ dark: true });
                handleSkin(true);
              }
              if (!getisPC()) {
                import("../node_modules/antd/dist/antd.compact.css");
              }
            }}
          />
        </Tooltip>
        <Divider dashed />
      </>
    );
  }
}
