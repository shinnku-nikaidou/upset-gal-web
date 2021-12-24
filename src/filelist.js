import React from 'react';
import 'antd/dist/antd.css';
import { List, BackTop, Modal, Input, Pagination, Divider } from 'antd';
import { ExclamationCircleOutlined, AudioOutlined } from '@ant-design/icons';
import { getArrayFile } from './menu'
const { confirm } = Modal;
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

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
  constructor(...args) {
    super(...args)
    this.state = {
      files: getArrayFile(),
      page: 1
    }
  }


  onSearch = value => {
    value = value.toUpperCase() + value.toLowerCase()
    let arrayFile = getArrayFile()
    let newArrayFile = arrayFile.map(v => [v, 0])
    for (let x = 0; x < arrayFile.length; x++) {
      for (let y = 0; y < value.length; y++) {
        try {
          let name = decodeURIComponent(arrayFile[x].name)
          if (name.substring(0, name.length - 4).indexOf(value[y]) !== -1 && value[y] !== ' ') {
            newArrayFile[x][1] += 1
          }
        } catch {

        }
      }
    }
    newArrayFile.sort((a, b) => {
      return b[1] - a[1]
    })
    this.setState({
      files: newArrayFile.map(v => v[0])
    })
  };

  onPaginationChange = (e) => {
    this.setState({
      page: e
    })
  }

  render() {
    return (
      <div id="hover-gal">
        <BackTop />
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          suffix={suffix}
          onSearch={this.onSearch}
        />
        <List
          itemLayout="horizontal"
          dataSource={this.state.files.slice((this.state.page - 1) * 10, this.state.page * 10)}
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
        <Pagination size="small" total={this.state.files.length} showSizeChanger={false} showQuickJumper onChange={this.onPaginationChange} />
        <Divider dashed />
      </div>
    );
  }
}

export { FileLi }