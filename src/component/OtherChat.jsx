import React, { Component } from 'react';
import * as StompJs from "@stomp/stompjs";
import styles from '../styles/ChatBoxStyle.css';

class OtherChat extends Component {
    render() {
        return (
            <div className='other'>
                    <span className='otherText'>
                        {this.props.msg} 
                    </span>
                </div>
        );
    }
}

export default OtherChat;