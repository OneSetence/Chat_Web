import React, { Component } from 'react';
import * as StompJs from "@stomp/stompjs";
import styles from '../styles/ChatBoxStyle.css';

class MyChat extends Component {
    render() {
        return (
            <div className='outMy'>
                <div className='my'>
                <span className='myText'>
                    {this.props.name} {/* this.props를 사용하여 접근 */}
                </span>
            </div>
            </div>
            
        );
    }
}

export default MyChat;
