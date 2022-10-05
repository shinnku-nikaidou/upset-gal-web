import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from 'react-dom/client';
import { Layout, ConfigProvider } from "antd";
import { DirectionType } from "antd/es/config-provider";
import { keyMap } from "./data/consts";
import { TKey } from "./data/interfaces";
import { GalPageHeader, SideMenu, FileList, Readme, PageFooter } from "./components";
import { getAccount } from "./utils";

import "./index.less";

import initChangeTheme, { globalTheme, ThemeProviderMenu, useGlobalTheme } from "./theme";
import t, { initLanguage } from "./languages";

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
      <title>{"galgame 资源分享"}</title>
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

const main = async () => {
  await initLanguage();
  const userAgentInfo = window.navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "iPad",
  ];
  const existsAgent = Agents.some((agent) => userAgentInfo.includes(agent));
  globalTheme.mobile = existsAgent;

  if (localStorage.hasOwnProperty("direction"))
    globalTheme.direction = localStorage.getItem("direction") as DirectionType;
  if (localStorage.hasOwnProperty("hasBGImage"))
    globalTheme.hasBGImage = localStorage.getItem("hasBGImage") === "true";
  const container = document.getElementById("root") as HTMLElement;
  const root = createRoot(container);
  root.render(<Main existsAgent={existsAgent} />,);
  initChangeTheme();
};

main();


