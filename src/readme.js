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
          defaultActiveKey={[1, 2, 3]}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          <Panel header="重磅消息" key="1" className="site-collapse-custom-panel">
            <p>[白井木汉化组]《灵感满溢的甜蜜创想》 汉化硬盘资源发布(<a target="_blank" rel="noreferrer" href="https://tieba.baidu.com/p/7241939432?lp=5027&mo_device=1&is_jingpost=0">原帖</a>):</p>
            <p><a target="_blank" rel="noreferrer" href="https://shinnku.com/files/%E7%81%B5%E6%84%9F%E6%BB%A1%E6%BA%A2%E7%9A%84%E7%94%9C%E8%9C%9C%E5%88%9B%E6%83%B3.7z">富婆妹 pc汉化硬盘直连(允许多线程) 线路一</a></p>
            <p><a target="_blank" rel="noreferrer" href="https://download.shinnku.com/files/%E7%81%B5%E6%84%9F%E6%BB%A1%E6%BA%A2%E7%9A%84%E7%94%9C%E8%9C%9C%E5%88%9B%E6%83%B3.7z">富婆妹 pc汉化硬盘直连(允许多线程) 线路二</a></p>
            <p>现在有网盘可以使用,点击左下角上传即可, 你可以捐赠此网站上没有的galgame在此处,也可以存自己的东西.</p>
            <p>网站已经整合完毕所有忧郁的弟弟/loli君的资源, 在windows/pc下均可搜到</p>
          </Panel>
          <Panel header="水群，反馈相关" key="2" className="site-collapse-custom-panel">
            <p>点此加入<a target="_blank" rel="noreferrer" href="https://t.me/upsetGroup">telegram群组</a>, 群组刚刚创立不久，有问题请在此反馈。</p>
            {/* <p>此为<a target="_blank" rel="noreferrer" href="https://qm.qq.com/cgi-bin/qm/qr?k=vg9L34SuUPvtUPAG_rH2pQntBA5YuuEr&jump_from=webapi">qq群（点击此处直接加群）</a>，有问题请在此反馈。</p> */}
          </Panel>
          <Panel header="下载相关" key="3" className="site-collapse-custom-panel">
            <p>请确保网速保持畅通，能够在一个半小时内完成下载。</p>
            <p>请不要使用线程下载器, 包括idm,fdm,迅雷等等</p>
            <p>当下载速度长达几分钟小于200kb/s的时候, 请立即停止下载, 这里不适合你下载</p>
            <p>如果下载不动请试试切换4g, 因为4g运营商它真的不限速</p>
          </Panel>
          <Panel header="法律与版权" key="4" className="site-collapse-custom-panel">
            <p>本资源仅供学习交流使用，请务必于下载后24小时内删除</p>
            <p>由于法律原因，日本境内朋友请不要下载。</p>
            <p>本站不承担任何为此带来的后果。</p>
          </Panel>
          <Panel header="后记" key="5" className="site-collapse-custom-panel">
            <p>网站编写者是一个纯粹的geek, 所以网站画风很没有审美</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}
export { Readme }