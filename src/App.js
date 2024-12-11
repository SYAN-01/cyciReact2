import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Calc1 from './comp/calc/study01'

import Inp1 from './comp/inp/input01'
import Oup1 from './comp/inp/output01'
import Ref from './comp/inp/Ref01'

import ProJoin from './comp/pro/Join'


import ProLogin from './comp/my/Logininput'
import ProLogin2 from './comp/my/Loginoutput'

import ProLogin3 from './comp/pro/Login'
import ProItemList from './comp/pro/ItemList'

import BoardList from './comp/mytask/boardlist'
import AddBoardPage from './comp/mytask/AddBoardPage'
import BoardDetailPage from './comp/mytask/BoardDetailPage'
import EditBoardPage from './comp/mytask/EditBoardPage'

import Red01 from './comp/red/red01'

import Ax1 from './comp/ax/ax01'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <About />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/cal1"} element={<Calc1 />} />

          <Route path={"/inp1"} element={<Inp1 />} />
          <Route path={"/oup1"} element={<Oup1 />} />
          <Route path={"/ref1"} element={<Ref />} />

          <Route path={"/pro1"} element={<ProJoin />} />

          <Route path={"/login"} element={<ProLogin />} />
          <Route path={"/login2"} element={<ProLogin2 />} />
          <Route path={"/login3"} element={<ProLogin3 />} />

          <Route path={"/itemList"} element={<ProItemList />} />

          <Route path={"/boardlist"} element={<BoardList />} />
          <Route path={"/addboard"} element={<AddBoardPage />} />
          <Route path={"/boarddetail/:boardId"} element={<BoardDetailPage />} />
          <Route path={"/editboard/:boardId"} element={<EditBoardPage />} />

          <Route path={"/red01"} element={<Red01 />} />


          <Route path={"/ax1"} element={<Ax1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function About() {
  return (
    <div style={{border: '2px blue solid'}}>
      <Link to="/">Home으로 이동</Link>
    </div>
  )
}

function Home() {
  return(
    <div>
      <h1>Start Home</h1>
      <Link to="/about">About으로 이동</Link><br/>
      <Link to="/cal1">Cal1로 이동하기</Link><br/>

      <h4>데이터 옮기기</h4>
      <Link to="/inp1">데이터 입력</Link><br/>
      <Link to="/oup1">데이터 출력</Link><br/>
      <Link to='/ref1'>Ref 사용하기</Link>

      <h4>Axios</h4>
      <Link to="/ax1">AXIOS 사용</Link><br/>

      <h4>로그인</h4>
      <Link to="/login3">로그인 창</Link>

      <h4>회원가입</h4>
      <Link to="/pro1">회원가입 창</Link><br/>

      <h4>과제</h4>
      <Link to="/login">로그인 창</Link><br/>

      <h4>게시판 과제</h4>
      <Link to="/boardlist">게시판</Link><br/>

      <h4>아이템리스트</h4>
      <Link to="/itemList">아이템 리스트</Link>


      <h4>리듀서</h4>
      <Link to="/red01">리듀서</Link>

    </div>
  )
}

export default App;
