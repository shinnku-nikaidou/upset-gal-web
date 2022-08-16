import { useCallback, useEffect, useState } from "react";
import { Divider, Dropdown, Input, List, message, Pagination, Skeleton } from "antd";
import { MessageType } from "antd/lib/message";
import { Item } from "../../data/interfaces";
import { nginxTransChar, showPromiseConfirm, shuffleArray } from "../../utils";
import { searchEngine } from "../../utils/searchFile";
import { menu } from "./RightClick";

interface IFileListProps {
  url: string;
  changeDirectory: (name: string) => void;
}

export const FileList = ({
  url,
  changeDirectory,
}: IFileListProps) => {
  if (url === "") /// TODO: remove this hack
    return <Skeleton active />;

  const [files, setFiles] = useState<Item[]>([]);
  const [dispFiles, setDispFiles] = useState<Item[]>([]);

  const loadFiles = useCallback(async (hide: MessageType) => {
    let res: Item[] = [];
    const resp = await fetch(`${window.location.origin}/${url}`);
    if (resp.status === 200 || resp.status === 304)
      res = await resp.json();
    shuffleArray(res);
    setFiles(res);
    setDispFiles(res);
    hide();
  }, [window.location.origin, url, setFiles]);

  useEffect(() => {
    setFiles([]);
    setDispFiles([]);
    const hide = message.loading("正在加载中", 0);
    loadFiles(hide);
  }, [loadFiles]);

  const [page, setPage] = useState(1);
  const onPaginationChange = useCallback((e: number) => setPage(e), [setPage]);

  const onSearch = useCallback((val: string) => {
    const newArrayFile = searchEngine(val, files);
    setFiles(newArrayFile.map((v) => v[0]));
    setDispFiles(files);
    setPage(1);
  }, [files, setDispFiles, setPage]);

  if (files.length === 0)
    return <Skeleton active />;

  const fileItem = (item: Item) => (<List.Item
    style={{ paddingLeft: "20px" }}
    // onClick={() => {
    //   if (item["@type"] === "file") {
    //     showPromiseConfirm(
    //       item.name,
    //       `/${url}/${nginxTransChar(item.name)}`
    //     );
    //   } else {
    //     changeDirectory(item.name);
    //   }
    // }}
  >
    <Dropdown overlay={menu(item, url)} trigger={['contextMenu', 'click']}>
      <List.Item.Meta
        title={item.name}
        description={`Size: ${item.size}, Type: ${item["@type"]}`}
      />
    </Dropdown>
  </List.Item>)


  const folderItem = (item: Item) => (<List.Item
    style={{ paddingLeft: "20px" }}
    onClick={() => { changeDirectory(item.name); }}
  >
    <List.Item.Meta
      title={item.name}
      description={`Size: ${item.size}, Type: ${item["@type"]}`}
    />
  </List.Item>)

  return (
    <div>
      <Input.Search
        placeholder="Input search text"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <List
        itemLayout="horizontal"
        dataSource={dispFiles.slice((page - 1) * 8, page * 8)}
        renderItem={(item: Item) => {
          if (item["@type"] === "file") return fileItem(item)
          else return folderItem(item)
        }}
      />
      <Pagination
        size="small"
        total={dispFiles.length}
        showSizeChanger={false}
        showQuickJumper
        onChange={onPaginationChange}
      />
      <Divider dashed />
    </div>
  );
};
