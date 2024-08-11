import './App.css';
import Header from'./component/Header'
import SendForm from './component/SendForm'
import YesOrNoChat from './component/YesOrNoChat'
import MyChat from './component/MyChat'
import * as StompJs from "@stomp/stompjs";
import DateSelectChat from './component/DateSelectChat';

function App() {
  return (
    <div>
      <Header />
      
      <MyChat msg='안녕하세요 저는 대화창입니다 나의 대화창이요'></MyChat> {/* msg를 name으로 전달 */}
      <YesOrNoChat title='일정제목' date="2024년 4월"></YesOrNoChat>
      <DateSelectChat 
        msg='아래 일정 중 가능한 일정이 있나요?'
        start1='2024년 6월 3일 11시 30분'
        start2='2024년 6월 3일 11시 30분'
        start3='2024년 6월 3일 11시 30분'>
      </DateSelectChat>
      <SendForm />
    </div>
  );
}

export default App;
