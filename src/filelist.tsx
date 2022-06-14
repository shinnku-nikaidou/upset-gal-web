import { List, BackTop, Modal, Input, Pagination, Divider } from "antd";
import { ExclamationCircleOutlined, AudioOutlined } from "@ant-design/icons";
import { changeFileLi, getArrayFile } from "./menu";
const { confirm } = Modal;
const { Search } = Input;
import { useState } from "react";
import { Item, key_map_type } from "./type";
import { get_key, key_map, RAI } from "./config";

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const showPromiseConfirm = (url: string, name: string) => {
  confirm({
    title: "下载确认",
    icon: <ExclamationCircleOutlined />,
    content: `你确定要下载 ${name} 吗？`,
    onOk() {
      window.open(url, "_parent");
    },
    onCancel() {},
  });
};

const nginx_trans_chr = (uri: string) => uri.replace(/%/g, "%25");

const FileLi = (args: { url: string }) => {
  const [files, setFiles] = useState(getArrayFile());
  const [page, setPage] = useState(1);

  const onSearch = (value: string) => {
    value = value.toLowerCase();
    console.log(value);
    let arrayFile = getArrayFile();
    let newArrayFile: Array<[Item, number]> = arrayFile.map((v) => [v, 0]);
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
        } catch {}
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
        } catch {}
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
        dataSource={files.slice((page - 1) * 8, page * 8)}
        renderItem={(item: Item) => (
          <List.Item
            style={{ paddingLeft: "20px" }}
            onClick={() => {
              console.log(item.name);
              switch (item["@type"]) {
                case "file":
                  showPromiseConfirm(
                    "/" + args.url + "/" + nginx_trans_chr(item.name),
                    decodeURI(item.name)
                  );
                  break;
                case "folder":
                  console.log(`this is just a folder ${JSON.stringify(item)}`);
                  changeFileLi(
                    RAI +
                      "/" +
                      key_map[get_key() as key_map_type] +
                      "/" +
                      item.name
                  );
                  break;
              }
            }}
          >
            <List.Item.Meta
              title={decodeURI(item.name)}
              description={`size:  ${item.size}  type ${item["@type"]}`}
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
};

export { FileLi };
