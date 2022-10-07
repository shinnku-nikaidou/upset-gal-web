import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from 'react-dom/client';
import { Layout, ConfigProvider } from "antd";
import { DirectionType } from "antd/es/config-provider";
import checkversion, { keyMap } from "../data/consts";
import { Mode, TKey } from "../data/interfaces";
import { GalPageHeader, SideMenu, FileList, Readme, PageFooter } from "./components";
import { getAccount } from "./utils";
import "./index.less";

import initChangeTheme, { getMobile, isMobile, ThemeProviderMenu, useGlobalTheme } from "./theme";
import t, { initLanguage } from "./languages";

const { Content, Sider } = Layout;

export const Main = () => {
  const [collapsed, setCollapsed] = useState(getMobile());
  const urlPrefix = useMemo(() => getAccount(), []);
  const [key, setKey] = useState<TKey>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (key !== null && key !== "10")
      setUrl(`${urlPrefix}/${keyMap[key]}`);
  }, [key]);

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
            theme={useGlobalTheme((state) => state.mode as Mode)}
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
                {key === null && <Readme />}
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
  ConfigProvider.config({
    theme: {
      primaryColor: '#25b864',
    },
  });
  checkversion();
  await initLanguage();
  const userAgentInfo = window.navigator.userAgent;
  const Agents = [
    "Android",
    "iPhone",
    "iPad",
  ];
  const existsAgent = Agents.some((agent) => userAgentInfo.includes(agent));
  isMobile(existsAgent);
  const container = document.getElementById("root") as HTMLElement;
  createRoot(container).render(<Main />,);
  initChangeTheme();
};

main();
