import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Upload, message, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: window.location.href + 'upload',
  method: "post",
  enctype: "multipart/form-data",
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class GalUpload extends React.Component {
  render() {
    return (
      <>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">在此上传您的galgame压缩包</p>
          <p className="ant-upload-hint">
            <p>如果您发现了某个gal本网站上没有，我们诚挚的邀请您上传到这里以做出贡献。</p>
            <p>压缩包名称请包含您的用户id，游戏的分类（win,kiri或者生肉）等标签，有版本号就带上版本号。</p>
            <p>如果有解压密码请附带解压密码，管理员会手动检查galgame压缩包并给予大量下载分数。</p>
            <p>目前没开放注册，但您仍然可以附带您将会注册的id上传，正式版开放注册后会为此id手动加上分数。</p>
          </p>
        </Dragger>
        <Divider />
      </>
    )
  }
}

export { GalUpload }