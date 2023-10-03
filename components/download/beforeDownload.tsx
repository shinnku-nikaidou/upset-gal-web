import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export const showPromiseConfirm = (name: string, url: string) => {
  Modal.confirm({
    title: '下载确认',
    icon: <ExclamationCircleOutlined />,
    content: `你确定要下载 ${name} ?`,
    onOk: () => window.open(url, '_parent'),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel: () => {},
  })
}
