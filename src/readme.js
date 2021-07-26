import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;


class Readme extends React.Component {

  state = {
    visible: true
  }

  componentDidMount() {
    this.VisibleID = setInterval(
      () => this.notVisible(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.VisibleID);
  }

  notVisible() {
    this.setState({});
  }

  render() {
    return (
      <div>
        <Collapse
          bordered={false}
          defaultActiveKey={[1,2,3]}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          <Panel header="重磅消息" key="1" className="site-collapse-custom-panel">
            <p>现在有网盘可以使用,点击左下角上传即可, 你可以捐赠此网站上没有的galgame在此处,也可以存自己的东西.</p>
            <p>目前正在整理非常多的galgame,不久之后即会大大扩充windows资源下的galgame库</p>
          </Panel>
          <Panel header="水群，反馈相关" key="2" className="site-collapse-custom-panel">
            <p>tg闲聊群最近创建，更希望大伙儿加入<a target="_blank" href="https://t.me/upsetGroup">此群</a>。</p>
            <p>qq群群号为<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=vg9L34SuUPvtUPAG_rH2pQntBA5YuuEr&jump_from=webapi">681053477（点击此处直接加群）</a>，有问题请在此反馈。</p>
          </Panel>
          <Panel header="下载相关" key="3" className="site-collapse-custom-panel">
            <p>请确保网速保持畅通，能够在一个半小时内完成下载。</p>
            <p>多线程下载器(<a target="_blank" href="https://www.freedownloadmanager.org/">fdm</a>,idm,aria2等)是无效的, 网站资源,包括网盘,强制单线程。</p>
            <p>请珍惜我们免费的流量,你每一次下载就消耗了我们与文件大小相同的流量</p>
            <p>如果下载不动请试试流量</p>
          </Panel>
          <Panel header="法律与版权" key="4" className="site-collapse-custom-panel">
            <p>本资源仅供学习交流使用，请务必于下载后24小时内删除</p>
            <p>由于法律原因，日本境内朋友请不要下载。</p>
            <p>本站不承担任何为此带来的后果。</p>
          </Panel>
          
        </Collapse>
      </div>
    );
  }
}
export { Readme }