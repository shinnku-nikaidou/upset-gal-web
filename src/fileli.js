import React from 'react';
import 'antd/dist/antd.css';
import { List, BackTop, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

function showPromiseConfirm(url, name) {
  confirm({
    title: '下载确认',
    icon: <ExclamationCircleOutlined />,
    content: '你确定要下载' + name + '吗？',
    onOk() {
      window.open(url, "_parent")
    },
    onCancel() { },
  });
}


class FileLi extends React.Component {

  render() {
    return (
      <div id="hover-gal">
        <BackTop />
        <List
          itemLayout="horizontal"
          dataSource={this.props.files}
          renderItem={item => (
            <List.Item style={{ paddingLeft: "20px" }}>
              <List.Item.Meta title={
                decodeURI(item.name)
              } description={"size: " + item.size}
                onClick={() => { showPromiseConfirm("/" + this.props.url + "/" + item.name, decodeURI(item.name)) }}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export { FileLi }