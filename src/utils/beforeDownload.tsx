import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const nginxTransChar = (uri: string) => uri.replace(/%/g, "%25");

export const showPromiseConfirm = (name: string, url: string) => {
  Modal.confirm({
    title: "下载确认",
    icon: <ExclamationCircleOutlined />,
    content: `你确定要下载 ${name} 吗？`,
    onOk: () => window.open(url, "_parent"), // Strange download method, which I have never seen before, but it seems to work well :)
    onCancel: () => { },
  });
};
