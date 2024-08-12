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
        setMessages((prevMessages) => [...prevMessages, message]);
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
                    if (msg.label === 'yesorno') {
                        addMessage(<YesOrNoChat title={msg.todoTitle} date={msg.start}/>);
                    } else if (msg.label === 'select') {
                        addMessage(<DateSelectChat start1={msg.start1} start2={msg.start2} start3={msg.start3} />);
                    } else {
                        addMessage(<MyChat msg={msg.data} />); // 나중에 기본 other로 바꾸기
                    }
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
