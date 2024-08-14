import React, { Component } from 'react';
import * as StompJs from "@stomp/stompjs";
import styles from '../styles/ChatBoxStyle.css';

class DateSelectChat extends Component {
    render() {
        return (
            <div>
                <div className='other'>
                    <span className='otherText'>
                        아래 중 선택할 수 있는 일정이 있나요?
                    </span>
                </div>

                <div className='DateBox'>
                        <span className='btnText'>
                        {this.props.start1}
                        </span>
                </div>
                <div className='DateBox'>
                        <span className='btnText'>
                        {this.props.start2}
                        </span>
                </div>
                <div className='DateBox'>
                        <span className='btnText'>
                        {this.props.start3}
                        </span>
                </div>
            
            </div>
            
        );
    }
}

export default DateSelectChat;