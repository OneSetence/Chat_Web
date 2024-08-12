import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import SendForm from './component/SendForm';
import MyChat from './component/MyChat';
import YesOrNoChat from './component/YesOrNoChat';
import DateSelectChat from './component/DateSelectChat';
import * as StompJs from '@stomp/stompjs';

function App() {
    const [messages, setMessages] = useState([]); // 메시지 상태를 App에서 관리
    const chatEndRef = useRef(null); // 마지막 요소에 대한 참조 생성
    const [client, setClient] = useState(null); // WebSocket 클라이언트

    // 새로운 메시지를 추가하는 함수
    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, renderMessage(message)]);
    };

    // 메시지를 JSX로 변환하는 함수
    const renderMessage = (message) => {
        if (message.label === 'yesorno') {
            return <YesOrNoChat key={message.todoId} title={message.message} date={message.date} />;
        } else if (message.laebl === 'date') {
            return <DateSelectChat key={message.todoId} start1={message.start1} start2={message.start2} start3={message.start3} />;
        } else {
            // MyChat 컴포넌트에 객체의 특정 값을 전달하여 렌더링
            return <MyChat key={message.todoId} msg={message.message} />;
        }
    };

    // WebSocket 연결 설정
    const connect = () => {
        const client = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/ws-stomp', // WebSocket 서버 URL
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000, // 자동 재연결 설정
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            console.log('Connected to WebSocket');
            client.subscribe('/sub/chatroom/hanfinal', (message) => {
                if (message.body) {
                    const msg = JSON.parse(message.body);
                    addMessage(msg);
                }
            });
        };

        client.onStompError = (error) => {
            console.error('Error in WebSocket connection:', error);
        };

        client.activate();
        setClient(client);
    };

    // WebSocket 연결 해제 함수
    const disconnect = () => {
        if (client !== null) {
            client.deactivate();
        }
    };

    // 메시지가 추가될 때마다 스크롤을 하단으로 이동
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 컴포넌트가 마운트될 때 WebSocket 연결
    useEffect(() => {
        connect();
        return () => disconnect(); // 컴포넌트가 언마운트될 때 연결 해제
    }, []);

    return (
        <div>
            <Header />
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
                <div ref={chatEndRef} className="bottom-padding"></div> {/* 스크롤 하단 여백 */}
            </div>
            <SendForm addMessage={addMessage} client={client} chatroomId="bot-chatroom" /> {/* SendForm에 메시지 추가 함수 및 WebSocket 클라이언트 전달 */}
        </div>
    );
}

export default App;
