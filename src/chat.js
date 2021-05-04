import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';
import { Chat, ContactItem, ContactList } from 'react-jwchat';


const Id = parseInt(Math.random() * 10000000000)


let sendChatContent = (message) => {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open('post', window.location.href + "chat");
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajaxObj.onreadystatechange = function () {
    if (ajaxObj.readyState === 4 && ajaxObj.status === 200) {
      let responce_text = ajaxObj.responseText
      console.log(responce_text)
      ///////////////////////
    }
  }
  console.log(JSON.stringify(message))
  ajaxObj.send(JSON.stringify(message));
}

class GalChat extends React.Component {
  state = {
    visible: false,
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
    contact: {
      id: Id,
      avatar: '//game.gtimg.cn/images/lol/act/img/champion/Jinx.png',
      nickname: '游客账户:' + Id,
      desc: '登陆之后可以个人账号说话哦，刷新界面将以新身份说话',
    },
    msgList: [
      {
        _id: '75b5bde8f3b9ef7aa9b704492cb28baf',
        date: 1610016580,
        user: {
          id: 1234,
          avatar: '//game.gtimg.cn/images/lol/act/a20201103lmpwjl/icon-ht.png',
          nickname: 'sirosong',
          desc: '',
        },
        message: { type: 'text', content: '早上好，h' },
      },
    ]
  };

  draggleRef = React.createRef();

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  sendMsg = msg => {
    console.log("msg is:", msg)
    window.msg = msg
    let newMsgList = this.state.msgList
    sendChatContent({
      _id: msg._id,
      date: msg.date,
      user: {
        id: msg.user.id,
        avatar: msg.user.avatar,
        nickname: msg.user.nickname,
        desc: msg.user.desc,
      },
      message: { type: 'text', content: msg.message.content },
    })
    newMsgList.push(msg)
    this.setState({
      msgList: newMsgList
    })
  }

  sendImg = files => {
    console.log(files)
  }

  onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = this.draggleRef?.current?.getBoundingClientRect();
    this.setState({
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    });
  };

  render() {
    const { bounds, disabled, visible } = this.state;
    return (
      <>
        <Button type="primary" onClick={this.showModal}>聊天</Button>
        <Modal
          width={this.props.width}
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  this.setState({
                    disabled: false,
                  });
                }
              }}
              onMouseOut={() => {
                this.setState({
                  disabled: true,
                });
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => { }}
              onBlur={() => { }}
            // end
            >
              公共聊天室
            </div>
          }
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          modalRender={modal => (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => this.onStart(event, uiData)}
            >
              <div ref={this.draggleRef}>{modal}</div>
            </Draggable>
          )}
        >
          <Chat
            contact={this.state.contact}
            me={this.state.contact}
            chatList={this.state.msgList}
            onSend={this.sendMsg}
            onEarlier={() => { }}
            onImage={this.sendImg}
            style={{
              width: this.props.width - 60,
              height: 500,
            }}
          />
        </Modal>
      </>
    );
  }
}


export default GalChat;