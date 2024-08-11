import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import SendForm from './component/SendForm';
import MyChat from './component/MyChat';

function App() {
    const [messages, setMessages] = useState([]); // 메시지 상태를 App에서 관리
    const chatEndRef = useRef(null); // 마지막 요소에 대한 참조 생성

    // 새로운 메시지를 추가하는 함수
    const addMessage = (message) => {
        setMessages([...messages, message]);
    };

    // 메시지가 추가될 때마다 스크롤을 하단으로 이동
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div>
            <Header />
            
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <MyChat key={index} msg={msg} />
                ))}
                <div ref={chatEndRef} className="bottom-padding"></div> {/* 스크롤 하단 여백 */}
            </div>
            
            <SendForm addMessage={addMessage} /> {/* SendForm에 메시지 추가 함수 전달 */}
        </div>
    );
}

export default App;



