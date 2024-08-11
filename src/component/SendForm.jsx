import React, { Component } from 'react';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import '../styles/SendFormStyle.css';
import MyChat from './MyChat';

class SendForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: '',
            messages: [] // 전송된 모든 메시지를 저장할 배열
        };
    }

    onChangeChat = (e) => {
        this.setState({ chat: e.target.value });
    };

    sendChat = () => {
        const { chat, messages } = this.state;
        if (chat === '') {
            return;
        }
        
        // 새로운 메시지를 배열에 추가
        this.setState({ 
            messages: [...messages, chat], // 기존 메시지 배열에 새 메시지 추가
            chat: '' // 입력 필드를 초기화
        });

        console.log('Message sent:', chat);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.sendChat();
    };

    render() {
        const { chat, messages } = this.state;
        return (
            <div>
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

                {/* 전송된 모든 메시지를 MyChat 컴포넌트로 렌더링 */}
                <div className="chatContainer">
                    {messages.map((msg, index) => (
                        <MyChat key={index} msg={msg} />
                    ))}
                </div>
            </div>
        );
    }
}

export default SendForm;
