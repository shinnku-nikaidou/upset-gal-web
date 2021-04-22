import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

class Login extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onSubmit = () => {
    
    this.onClose()
  }

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showDrawer}>
          <PlusOutlined /> 注册
        </Button>
        <Drawer
          title="注册新账号"
          width={600}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={this.onSubmit} type="primary">
                提交
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  name="name"
                  label="昵称"
                  rules={[{ required: true, message: '请输入昵称' }]}
                >
                  <Input placeholder="昵称不要超过15个字哦" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[{ required: true, message: '输入密码' }]}
                >
                  <Input.Password
                    style={{ width: '100%' }}
                    placeholder="请输入密码"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  name="sex"
                  label="性别"
                  rules={[{ required: true, message: '请选择性别' }]}
                >
                  <Select placeholder="请选择你的性别">
                    <Option value="xiao">男</Option>
                    <Option value="mao">女</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="repassword"
                  label="重复密码"
                  rules={[{ required: true, message: '请重复密码' }]}
                >
                  <Input.Password
                    style={{ width: '100%' }}
                    placeholder="请再输一次密码确保正确哦"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  name="birth"
                  label="生日"
                  rules={[{ required: true, message: '请选择你的生日' }]}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={20}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: false,
                      message: '可以输入自我简介哦',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="请输入自我简介" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
}

export { Login }