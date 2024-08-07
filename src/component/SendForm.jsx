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
        if (chat === '') {
            return;
        }
        // 메시지 전송 로직을 여기에 추가
        console.log('Message sent:', chat);
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
