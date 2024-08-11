import './App.css';
import Header from './component/Header';
import SendForm from './component/SendForm';
import YesOrNoChat from './component/YesOrNoChat';
import MyChat from './component/MyChat';
import * as StompJs from "@stomp/stompjs";
import DateSelectChat from './component/DateSelectChat';

function App() {
  // const [chat, setChat] = useState(""); // 입력된 chat을 받을 변수
  // const [chatList, setChatList] = useState([]); // 채팅 기록

  // 소켓 연결

  return (
    <div>
      <Header />
      
      
      
      <SendForm />
    </div>
  );
}

export default App;


