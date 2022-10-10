import { useCallback, useMemo } from "react";
import { Menu, Typography } from "antd";
import { Item } from "../../data/interfaces";
import { nginxTransChar } from "../../utils";

const { Text, Link } = Typography;

interface IRightClickMenuProps {
  item: Item;
  url: string;
  lang: string
}

export const RightClickMenu = ({
  item,
  url,
  lang
}: IRightClickMenuProps) => {
  const downloadLink = useMemo(() => {
    return `${window.location.origin}/${url}/${nginxTransChar(item.name)}`;
  }, [url, item.name]);

  const copyLink = useCallback(() => navigator.clipboard.writeText(downloadLink), [downloadLink]);

  return (
    <Menu
      items={[
        {
          label: (
            <Link target="_blank" href={downloadLink}>
              点击下载 {item.name}
            </Link>
          ),
          key: "1",
        },
        {
          label: (
            <Text onClick={copyLink}>
              复制下载链接
            </Text>
          ),
          key: "2",
        }
      ]}
    />
  );
};
