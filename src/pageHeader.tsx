import React from "react";
import "./index.css";
import { PageHeader } from "antd";

class GalPageHead extends React.Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title={
            <>
              <div onClick={() => window.location.reload()}>失落的小站</div>
            </>
          }
          subTitle={<>欢迎来到 galgame 分享站点</>}
        ></PageHeader>
      </>
    );
  }
}

export { GalPageHead };
