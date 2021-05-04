import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input, Select,
  DatePicker,
  notification,
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

const openNotification = (state) => {
  let x = ""
  var emailRegExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (state.name.length === 0) {
    x = "你的昵称在哪里呢？"
  } else if (state.name.length > 15) {
    x = "都说了昵称不要超过15个字。"
  } else if (state.password === "0") {
    x = "你忘记输入密码了。"
  } else if (state.password !== state.repassword) {
    x = "你密码两次输入都不一致。。。"
  } else if (!emailRegExp.test(state.mail)) {
    x = "邮箱输入不正确，请重新输入。"
  } else {
    loginPost(state)
    return
  }
  notification.info({
    message: `注册结果`,
    description: x,
    placement: 'topLeft',
  });
};

let loginPost = (state) => {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open('post', window.location.href + "login");
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajaxObj.onreadystatechange = function () {
    if (ajaxObj.readyState === 4 && ajaxObj.status === 200) {
      let responce_text = ajaxObj.responseText
      console.log(responce_text)
      notification.info({
        message: `注册结果`,
        description:
          `注册成功`,
        placement: 'topLeft',
      });
    }
  }
  ajaxObj.send(JSON.stringify(state));
}

class Login extends React.Component {

  state = {
    visible: false,
    name: '',
    password: '',
    repassword: '',
    birth: '',
    description: '',
    sex: '',
    mail: ''
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleMailChange = (e) => {
    this.setState({
      mail: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleRepasswordChange = (e) => {
    this.setState({
      repassword: e.target.value
    });
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  handleBirthReset = (e) => {
    this.setState({
      birth: e.format()
    });
  }

  handleSexSelect = (v) => {
    this.setState({
      sex: v
    });
  }

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
    console.log("onSubmit is start")
    openNotification(this.state)
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
                  onChange={this.handleNameChange}
                >
                  <Input placeholder="昵称不要超过15个字哦" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[{ required: true, message: '输入密码' }]}
                  onChange={this.handlePasswordChange}
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
                  id="sex"
                  name="sex"
                  label="性别"
                  rules={[{ required: true, message: '请选择性别' }]}
                >
                  <Select placeholder="请选择你的性别" onSelect={this.handleSexSelect}>
                    <Option value="man">男</Option>
                    <Option value="woman">女</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="repassword"
                  label="重复密码"
                  rules={[{ required: true, message: '请重复密码' }]}
                  onChange={this.handleRepasswordChange}
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
                  <DatePicker
                    format={dateFormat}
                    onChange={this.handleBirthReset}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={10}>
                <Form.Item
                  name="mail"
                  label="邮箱"
                  rules={[{ required: true, message: '请输入邮箱' }]}
                  onChange={this.handleMailChange}
                >
                  <Input placeholder="" />
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
                  onChange={this.handleDescriptionChange}
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