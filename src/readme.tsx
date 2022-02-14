import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

export default class Readme extends React.Component {
  state = {
    visible: true,
  };
  VisibleID!: any;

  componentDidMount() {
    this.VisibleID = setInterval(() => this.notVisible(), 1000);
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
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header="重磅消息"
            key="1"
            className="site-collapse-custom-panel"
          >
            <p>
              网站已经整合完毕所有忧郁的弟弟/loli君的资源,
              在windows/pc下均可搜到
            </p>
            <p>由于之前服务器爆炸缘故，网盘暂时不可使用</p>
          </Panel>
          <Panel
            header="水群，反馈相关"
            key="2"
            className="site-collapse-custom-panel"
          >
            <p>
              点此加入
              <a
                target="_blank"
                rel="noreferrer"
                href="https://t.me/upsetGroup"
              >
                telegram群组
              </a>
              ，有问题请在此反馈。
            </p>
            <p>此为<a target="_blank" rel="noreferrer" href="https://jq.qq.com/?_wv=1027&k=mrCvdEk8">qq群（点击此处直接加群）</a>，有问题请在此反馈。</p>
          </Panel>
          <Panel
            header="下载相关"
            key="3"
            className="site-collapse-custom-panel"
          >
            <p>请确保网速保持畅通，能够在1200s内完成下载, 否则可能会提示需要认证。</p>
            <p>网站下载不限速, 如果下载不动请试试切换 流量</p>
          </Panel>
          <Panel
            header="法律与版权"
            key="4"
            className="site-collapse-custom-panel"
          >
            <p>本资源仅供学习交流使用，请务必于下载后24小时内删除</p>
            <p>由于法律原因，日本境内朋友请不要下载。</p>
            <p>本站不承担任何为此带来的后果</p>
            <p>请自行调查了解并遵守当地的法律规定。</p>
            <p>法律を調べて遵守する取り組みは</p>
            <p>
              you are still responsible to research and comply with local laws.
            </p>
            <p>本公告（法律）长期有效</p>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

