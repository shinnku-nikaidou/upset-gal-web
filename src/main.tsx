import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { Layout, ConfigProvider } from "antd";
import { DirectionType } from "antd/es/config-provider";
import { keyMap } from "./data/consts";
import { setIsPC, TKey } from "./data/interfaces";
import { GalPageHeader, SideMenu, FileList, Readme, PageFooter } from "./components";
import { getAccount } from "./utils";

import "./index.less";

import initChangeTheme, { globalTheme, ThemeProviderMenu, useGlobalTheme } from "./theme";

const { Content, Sider } = Layout;

const Main = ({
  existsAgent
}: {
  existsAgent: boolean;
}) => {
  const [collapsed, setCollapsed] = useState(existsAgent);

  const urlPrefix = useMemo(() => getAccount(), []);

  const [key, setKey] = useState<TKey>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (key !== null && key !== "10")
      setUrl(`${urlPrefix}/${keyMap[key]}`);
  }, [key, setUrl]);

  const onCollapse = useCallback((collapsed: boolean) => setCollapsed(collapsed), [setCollapsed]);

  return (
    <React.StrictMode>
      <ConfigProvider direction={useGlobalTheme((state) => state.direction) as DirectionType}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            theme="light"
          >
            <SideMenu setKey={setKey} />
          </Sider>
          <Layout className="site-layout">
            <GalPageHeader />
            <Content style={{ margin: "0 16px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                {key !== null && (key === "10" ? <ThemeProviderMenu /> : (
                  <FileList 
                    url={url}
                    changeDirectory={(name) => setUrl(`${urlPrefix}/${keyMap[key]}/${name}`)}
                  />
                ))}
                <Readme />
              </div>
            </Content>
            <PageFooter />
          </Layout>
        </Layout>
      </ConfigProvider>
    </React.StrictMode>
  );
};

const main = () => {
  const userAgentInfo = window.navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  const existsAgent = Agents.some((agent) => userAgentInfo.includes(agent));
  setIsPC(existsAgent);

  if (localStorage.hasOwnProperty("direction"))
    globalTheme.direction = localStorage.getItem("direction") as DirectionType;
  if (localStorage.hasOwnProperty("hasBGImage"))
    globalTheme.hasBGImage = localStorage.getItem("hasBGImage") === "true";

  ReactDOM.render(<Main existsAgent={existsAgent} />, document.getElementById("root"));
  initChangeTheme();
};

main();
