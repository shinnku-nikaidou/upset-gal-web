import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { getfeedbackvisible, setfeedbackvisible } from './config'
import { Modal, Button } from 'antd';

class FeedBack extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        if (getfeedbackvisible()) {
          this.showModal()
        }
      }, 300
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  handleOk = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000);
  };

  handleCancel = () => {
    setfeedbackvisible(false)
    this.setState({ visible: false })
  };

  render() {
    const { visible, loading } = this.state
    return (
      <>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <p>目前暂未设立直接接收反馈的通道</p>
          <p>可以加入群聊反馈哦</p>
          <p></p>
          <p></p>
        </Modal>
      </>
    );
  }
}

export { FeedBack }