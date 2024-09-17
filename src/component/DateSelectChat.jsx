import React, { Component } from 'react';
import styles from '../styles/ChatBoxStyle.css';

class DateSelectChat extends Component {
    handleDateClick = (date) => {
        this.props.onDateSelect(date); // 부모 컴포넌트로 선택한 날짜 전송
    };

    render() {
        return (
            <div>
                <div className='other'>
                    <span className='otherText'>
                        아래 중 선택할 수 있는 일정이 있나요?
                    </span>
                </div>

                {this.props.start1 && (
                    <div className='DateBox' onClick={() => this.handleDateClick(this.props.start1)}>
                        <span className='btnText'>
                            {this.props.start1}
                        </span>
                    </div>
                )}

                {this.props.start2 && (
                    <div className='DateBox' onClick={() => this.handleDateClick(this.props.start2)}>
                        <span className='btnText'>
                            {this.props.start2}
                        </span>
                    </div>
                )}

                {this.props.start3 && (
                    <div className='DateBox' onClick={() => this.handleDateClick(this.props.start3)}>
                        <span className='btnText'>
                            {this.props.start3}
                        </span>
                    </div>
                )}
            </div>
        );
    }
}

export default DateSelectChat;
