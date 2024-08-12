import React, { Component } from 'react';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import '../styles/SendFormStyle.css';

class SendForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: ''
        };
    }

    onChangeChat = (e) => {
        this.setState({ chat: e.target.value });
    };

    sendChat = () => {
        const { chat } = this.state;
        const { client, chatroomId } = this.props; // 부모 컴포넌트로부터 전달된 WebSocket 클라이언트와 채팅방 ID

        if (chat === '') {
            return;
        }

        // 서버로 메시지 전송
        client.publish({
            destination: "/pub/chatroom/" + chatroomId,
            body: JSON.stringify({
                type: "CHAT",
                sender: "user123", // 실제 사용자 식별자 (하드코딩되어 있지만 실제 앱에서는 동적으로 설정 가능)
                channelId: chatroomId,
                data: chat,
                label: "gpt" // label을 'gpt'로 설정
            }),
        });

        // 부모 컴포넌트(App.js)로 전송된 메시지 전달 (로컬에도 메시지 기록)
        this.props.addMessage({
            sender: "user123",
            data: chat,
            date: new Date().toLocaleTimeString(),
            label: "gpt"
        });

        // 입력 필드 초기화
        this.setState({ chat: '' });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.sendChat();
    };

    render() {
        const { chat } = this.state;
        return (
            <form className="sendzone" onSubmit={this.handleSubmit}>
                <div className="inputbar">
                    <input
                        type="text"
                        id="msg"
                        placeholder="메시지 보내기"
                        className="input"
                        value={chat}
                        onChange={this.onChangeChat}
                    />
                    <button type="submit" className="sendbtn">
                        <ArrowUpCircleIcon className="sendIcon" />
                    </button>
                </div>
            </form>
        );
    }
}

export default SendForm;
