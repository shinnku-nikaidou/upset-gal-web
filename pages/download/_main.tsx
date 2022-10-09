import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Layout, ConfigProvider } from "antd";
import { DirectionType } from "antd/es/config-provider";
import checkversion, { keyMap } from "../../data/consts";
import { Mode, TKey } from "../../data/interfaces";
import { GalPageHeader, SideMenu, FileList, Readme, PageFooter } from "../../components";
import { getAccount } from "../../utils";

import { ThemeProviderMenu, useGlobalTheme } from "../_theme";
import t, { initLanguage } from "../languages";

const { Content, Sider } = Layout;

export const Main = (props: { isMobile: boolean }) => {
  const [collapsed, setCollapsed] = useState(props.isMobile);
  const urlPrefix = useMemo(() => getAccount(), []);
  const [key, setKey] = useState<TKey>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    console.log(key);
    if (key !== null && key !== "10")
      setUrl(`api/download/${urlPrefix}/${keyMap[key]}`);
  }, [key, urlPrefix]);

  const onCollapse = useCallback((collapsed: boolean) => setCollapsed(collapsed), [setCollapsed]);

  return (
    <React.StrictMode>
      <ConfigProvider direction={useGlobalTheme((state) => state.direction) as DirectionType}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            theme={useGlobalTheme((state) => state.mode as Mode)}
          >
            <SideMenu setKey={setKey} isMobile={props.isMobile} />
          </Sider>
          <Layout className="site-layout">
            <GalPageHeader />
            <Content style={{ margin: "0 16px" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                {key !== null && (key === "10" ? <ThemeProviderMenu /> : (url !== "" ?
                  <FileList
                    url={url}
                    changeDirectory={(name) => setUrl(`${urlPrefix}/${keyMap[key]}/${name}`)}
                  /> : <></>
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
};

main();
