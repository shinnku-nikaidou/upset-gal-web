import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { PageHeader, Button } from 'antd';
import { Login } from './login'

class GalPageHead extends React.Component {
  onReturnOld = () => {
    console.log("重定向到旧版中");
    window.location.replace("https://www.galgame.cyou/")
  };
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          title={<>
            <div onClick={() => window.location.reload()}>失落的小站</div>
          </>}
          subTitle="欢迎来到 galgame 分享站点"
          extra={[
            <Button key="3" onClick={this.onReturnOld}>回到旧版</Button>,
            <Button key="2">登陆</Button>,
            <Login key="1" />,
          ]}
        >
        </PageHeader>
      </>
    )
  }
}

export { GalPageHead }