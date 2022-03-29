import React from "react";
import { List, BackTop, Modal, Input, Pagination, Divider } from "antd";
import { ExclamationCircleOutlined, AudioOutlined } from "@ant-design/icons";
import { getArrayFile } from "./menu";
const { confirm } = Modal;
const { Search } = Input;
import { useState } from 'react';
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

function showPromiseConfirm(url: string, name: string) {
  confirm({
    title: "下载确认",
    icon: <ExclamationCircleOutlined />,
    content: "你确定要下载" + name + "吗？",
    onOk() {
      window.open(url, "_parent");
    },
    onCancel() { },
  });
}
const FileLi = (args: any) => {
  const [files, setFiles] = useState(getArrayFile());
  const [page, setPage] = useState(1);

  const onSearch = (value: string) => {
    value = value.toLowerCase();
    console.log(value);
    let arrayFile = getArrayFile();
    let newArrayFile = arrayFile.map((v) => [v, 0]);
    for (let x = 0; x < arrayFile.length; x++) {
      for (let y = 0; y < value.length; y++) {
        try {
          let name = decodeURIComponent(arrayFile[x].name).toLowerCase();
          if (
            name.substring(0, name.length - 3).includes(value[y]) &&
            value[y] !== " "
          ) {
            newArrayFile[x][1] += 1;
          }
        } catch { }
      }
    }
    for (let x = 0; x < arrayFile.length; x++) {
      for (let y = 0; y < value.length - 2; y++) {
        try {
          let name = decodeURIComponent(arrayFile[x].name).toLowerCase();
          if (
            name
              .substring(0, name.length - 3)
              .includes(value.substring(y, y + 2))
          ) {
            newArrayFile[x][1] += 5;
          }
        } catch { }
      }
    }
    newArrayFile.sort((a, b) => b[1] - a[1]);
    setFiles(newArrayFile.map((v) => v[0]));
  };

  const onPaginationChange = (e: number) => setPage(e);
  return (
    <div id="hover-gal">
      <BackTop />
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={suffix}
        onSearch={onSearch}
      />
      <List
        itemLayout="horizontal"
        dataSource={files.slice((page - 1) * 10, page * 10)}
        renderItem={(item: any) => (
          <List.Item
            style={{ paddingLeft: "20px" }}
            onClick={() => {
              showPromiseConfirm(
                "/" + args.url + "/" + item.name, //FIXME: I cant figure out this.props.url , so this may have some bugs.
                decodeURI(item.name)
              );
            }}
          >
            <List.Item.Meta
              title={decodeURI(item.name)}
              description={"size: " + item.size}
            />
          </List.Item>
        )}
      />
      <Pagination
        size="small"
        total={files.length}
        showSizeChanger={false}
        showQuickJumper
        onChange={onPaginationChange}
      />
      <Divider dashed />
    </div>
  );
}


export { FileLi };
