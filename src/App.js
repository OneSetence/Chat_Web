import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import SendForm from './component/SendForm';
import MyChat from './component/MyChat';
import YesOrNoChat from './component/YesOrNoChat';
import DateSelectChat from './component/DateSelectChat';
import * as StompJs from '@stomp/stompjs';
import OtherChat from './component/OtherChat';
import { todoId, setTodoId } from './global';

function App() {
    const [messages, setMessages] = useState([]); // 메시지 상태를 App에서 관리
    const chatEndRef = useRef(null); // 마지막 요소에 대한 참조 생성
    const clientRef = useRef(null); // WebSocket 클라이언트를 useRef로 관리

    // 새로운 메시지를 추가하는 함수
    const addMessage = (message) => {
        setMessages(prevMessages => {
            if (prevMessages.some(msg => msg.key === message.todoId)) {
                return prevMessages; // 중복된 메시지는 추가하지 않음
            }
            // message.label === 'yesorno'일 경우 전역 변수로 todoId 저장
            if (message.label === 'yesorno') {
                setTodoId(message.todoId);  // 전역 변수에 저장
            }
            return [...prevMessages, renderMessage(message)];
        });
    };

    // 메시지를 JSX로 변환하는 함수
    const renderMessage = (message) => {
        if (message.label === 'yesorno') { 
            return <YesOrNoChat key={message.todoId} title={message.todoTitle} date={message.start} msg={message.message} username={message.nickName} onResponse={handleResponse} />;
        } else if (message.label === 'date') {  
            return <DateSelectChat key={message.todoId} start1={message.start1} start2={message.start2} start3={message.start3} />;
        } else if (message.label === 'message') {
            return <OtherChat key={message.todoId} msg={message.message} />
        } else {
            return <MyChat key={message.todoId} msg={message.message} />;
        }
    };

    // 사용자가 응답을 선택했을 때 호출되는 함수
    const handleResponse = (response) => {
        // 1. "아니요"라는 메시지를 MyChat으로 추가
        addMessage({
            todoId: `response_${new Date().getTime()}`, // 고유한 ID 생성
            label: 'mychat',
            message: response,
            date: new Date().toLocaleTimeString(),
        });

        // 2. WebSocket을 통해 서버로 "아니요" 메시지 전송
        if (clientRef.current) {
            clientRef.current.publish({
                destination: '/pub/chatroom/hanfinal',
                body: JSON.stringify({
                    todoId: todoId,
                    type: "yesorno",
                    message: response
                }),
            });
        }
    };

    // WebSocket 연결 설정
    const connect = () => {
        const client = new StompJs.Client({
            brokerURL: 'ws://onesentence.store/ws-stomp', // WebSocket 서버 URL
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
        clientRef.current = client; // WebSocket 클라이언트를 useRef에 저장
    };

    // WebSocket 연결 해제 함수
    const disconnect = () => {
        if (clientRef.current !== null) {
            clientRef.current.deactivate();
            clientRef.current = null; // 클라이언트 연결 해제 후 초기화
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
            <SendForm addMessage={addMessage} client={clientRef.current} chatroomId="bot-chatroom" /> {/* SendForm에 메시지 추가 함수 및 WebSocket 클라이언트 전달 */}
        </div>
    );
}

export default App;
