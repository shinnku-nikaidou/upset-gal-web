import { useCallback, useEffect, useState } from "react";
import {
  Divider,
  Dropdown,
  Input,
  List,
  message,
  Pagination,
  Skeleton,
} from "antd";
import { MessageType } from "antd/lib/message";
import { Item } from "../../data/interfaces";
import { searchEngine, shuffleArray } from "../../utils";
import { RightClickMenu } from "./RightClick";

const FileItem = ({ item, url }: { item: Item; url: string }) => (
  <List.Item style={{ paddingLeft: "20px" }}>
    <Dropdown
      overlay={<RightClickMenu item={item} url={url} />}
      trigger={["contextMenu", "click"]}
    >
      <List.Item.Meta
        title={item.name}
        description={`Size: ${item.size}, Type: ${item["@type"]}`}
      />
    </Dropdown>
  </List.Item>
);

const FolderItem = ({
  item,
  changeDirectory,
}: {
  item: Item;
  changeDirectory: (name: string) => void;
}) => (
  <List.Item
    style={{ paddingLeft: "20px" }}
    onClick={() => {
      changeDirectory(item.name);
    }}
  >
    <List.Item.Meta
      title={item.name}
      description={`Size: ${item.size}, Type: ${item["@type"]}`}
    />
  </List.Item>
);

interface IFileListProps {
  url: string;
  changeDirectory: (name: string) => void;
}

export const FileList = ({ url, changeDirectory }: IFileListProps) => {
  if (url === "")
    return <Skeleton active />;

  const [files, setFiles] = useState<Item[]>([]);
  const [dispFiles, setDispFiles] = useState<Item[]>([]);

  const loadFiles = useCallback(
    async (hide: MessageType) => {
      let res: Item[] = [];
      const resp = await fetch(`${window.location.origin}/${url}`);
      if (resp.status === 200 || resp.status === 304) res = await resp.json();
      shuffleArray(res);
      setFiles(res);
      setDispFiles(res);
      hide();
    },
    [window.location.origin, url]
  );

  useEffect(() => {
    setFiles([]);
    setDispFiles([]);
    const hide = message.loading("正在加载中", 0);
    loadFiles(hide);
  }, [loadFiles]);

  const [page, setPage] = useState(1);
  const onPaginationChange = useCallback((e: number) => setPage(e), [setPage]);

  const onSearch = useCallback(
    (val: string) => {
      const tmp = searchEngine(val, files);
      const newArrayFile = tmp.map((v) => v[0]);
      setFiles(newArrayFile);
      setDispFiles(tmp.filter((v) => v[1] > 0).map((v) => v[0]));
      setPage(1);
    },
    [files, setFiles, setDispFiles, setPage]
  );

  if (files.length === 0) return <Skeleton active />;

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
          if (item["@type"] === "file") {
            return <FileItem item={item} url={url} />;
          }
          return <FolderItem item={item} changeDirectory={changeDirectory} />;
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
