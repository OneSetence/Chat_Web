import React, { Component } from 'react';
import * as StompJs from "@stomp/stompjs";
import styles from '../styles/ChatBoxStyle.css';

class YesOrNoChat extends Component {
    render() {
        return (
            <div>
                <div className='other'>
                    <span className='otherText'>
                        {this.props.name} {/* this.props를 사용하여 접근 */}
                    </span>
                </div>
                <div className='other'>
                    <div>
                        <span className='OtherTitle'>일정제목입니다.</span>
                    </div>
                    <div>
                        <span className='otherText'>
                            일정 : {this.props.date} {/* this.props를 사용하여 접근 */}
                        </span>
                    </div>
                   
                
                </div>
                <div className='BtnRow'>
                    <button className='YesOrNoBtn'>
                        <span className='btnText'>
                            예
                        </span>
                    </button>
                    <button className='YesOrNoBtn'>
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