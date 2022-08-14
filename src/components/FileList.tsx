import { useCallback, useEffect, useState } from "react";
import { Divider, Input, List, message, Pagination, Skeleton } from "antd";
import { MessageType } from "antd/lib/message";
import { Item } from "../data/interfaces";
import { nginxTransChar, showPromiseConfirm, shuffleArray } from "../utils";

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
    // 把待搜索字符串逐字符拆开，并在中间插入 (.*?) 来实现模糊匹配
    const searchReg = new RegExp(`^(.*?)(${val.split("").join(")(.*?)(")})(.*?)$`, "i"); // 终极混乱邪恶正则
    setDispFiles(files.filter((file) => searchReg.test(file.name)));
    setPage(1);
  }, [files, setDispFiles, setPage]);

  if (files.length === 0)
    return <Skeleton active />;

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
        renderItem={(item) => (
          <List.Item
            style={{ paddingLeft: "20px" }}
            onClick={() => {
              if (item["@type"] === "file") {
                showPromiseConfirm(
                  item.name,
                  `/${url}/${nginxTransChar(item.name)}`
                );
              } else {
                changeDirectory(item.name);
              }
            }}
          >
            <List.Item.Meta
              title={item.name}
              description={`Size: ${item.size}, Type: ${item["@type"]}`}
            />
          </List.Item>
        )}
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
