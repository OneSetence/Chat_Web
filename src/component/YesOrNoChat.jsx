import React, { Component } from 'react';
import styles from '../styles/ChatBoxStyle.css';

class YesOrNoChat extends Component {
    handleResponse = (response) => {
        this.props.onResponse(response); // 부모 컴포넌트(App)로 응답 전송
    };

    render() {
        return (
            <div>
                <div className='other'>
                    <span className='otherText'>
                         예진님이 아래 일정을 변경하고 싶어해요
                    </span>
                </div>
                <div className='other'>
                    <div>
                        <span className='OtherTitle'>{this.props.title}</span>
                    </div>
                    <div>
                        <span className='otherText'>
                            날짜 : {this.props.date} {/* this.props를 사용하여 접근 */}
                        </span>
                    </div>
                </div>
                <div className='BtnRow'>
                    <button className='YesOrNoBtn' onClick={() => this.handleResponse('예')}>
                        <span className='btnText'>
                            예
                        </span>
                    </button>
                    <button className='YesOrNoBtn' onClick={() => this.handleResponse('아니요')}>
                        <span className='btnText'>
                            아니요
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

export default YesOrNoChat;
