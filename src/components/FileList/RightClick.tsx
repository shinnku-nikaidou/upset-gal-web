import 'antd/dist/antd.css';
import { Menu, Typography } from 'antd';
import { Item } from '../../data/interfaces';
import { nginxTransChar } from '../../utils';
const { Text, Link } = Typography;

export const menu = (item: Item, url: string) => {
  const downloadLink = window.location.origin + `/${url}/${nginxTransChar(item.name)}`
  return (
    <Menu
      items={[
        {
          label: <Link target="_blank" href={downloadLink}>
            点击下载 {item.name}
          </Link>,
          key: '1',
        },
        {
          label: <Text onClick={() => {
            navigator.clipboard.writeText(downloadLink)
          }}> 复制下载链接 </Text>,
          key: '2',
        }
      ]}
    />
  )
};
