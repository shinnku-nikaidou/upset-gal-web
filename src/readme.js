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
          defaultActiveKey={[2,3]}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          <Panel header="版本相关" key="1" className="site-collapse-custom-panel">
            <p>此版本为完全预览版，注册等功能暂未开放</p>
            <p>如果您更习惯旧版，很可惜，现在已经没有旧版了</p>
          </Panel>
          <Panel header="水群，反馈相关" key="2" className="site-collapse-custom-panel">
            <p>tg闲聊群最近创建，更希望大伙儿加入<a target="_blank" href="https://t.me/upsetGroup">此群</a>。</p>
            <p>qq群群号为<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=vg9L34SuUPvtUPAG_rH2pQntBA5YuuEr&jump_from=webapi">681053477（点击此处直接加群）</a>，有问题请在此反馈。</p>
            {/* <p>问题答案为gal.acg18.win</p> */}
          </Panel>
          <Panel header="下载相关" key="3" className="site-collapse-custom-panel">
            <p>请勿使用各类下载器，包括但不限于迅雷，idm等，自用浏览器下载足够，请确保网速保持畅通，能够在一个半小时内完成下载。</p>
            <del><p>下载慢请使用多线程下载器(<a target="_blank" href="https://www.freedownloadmanager.org/">fdm</a>,idm,aria2等)并且使用魔法。</p></del>
            <p>为防止恶意刷流量，<del>下载每128mb会自动中断</del>，已取消，可随意下载。</p>
            <p><del>请手动点击浏览器窗口中的恢复下载。</del></p>
          </Panel>
          <Panel header="法律与版权" key="4" className="site-collapse-custom-panel">
            <p>本资源仅供学习交流使用，请务必于下载后24小时内删除</p>
            <p>本站不承担任何为此带来的后果。</p>
            <p>由于法律原因，日本境内朋友暂时无法下载。</p>
          </Panel>
          <Panel header="其他" key="5" className="site-collapse-custom-panel">
          <del><p>本站诚挚邀请您上传本站没有的galgame</p></del>
            <p>请前往上面的telegram群组进行文件的搬运交流。</p>
            <p>temp里面即为未被整理的使用本网站上传的gal</p>
            <p>整理完毕后会被分类到其他类别</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}
export { Readme }