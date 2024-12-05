import { useEffect, useRef, useState } from 'react';
import { memberIdCheck, areaList, memberRegist } from '../api/member'

function Study() {

  const [아이디, 변경아이디] = useState('');        //아이디 입력
  const [password, setPassword] = useState('');  //비밀번호 입력
  const [name, setName] = useState('');           //이름 입력
  const [email, setEmail] = useState('');         //이메일 입력
  const [gender, setGender] = useState('M');      //성별 ( 기본값: 남자 )
  const [birth, setBirth] = useState('');         //생년 월일
  const [area, setArea] = useState('');           //지역

  const [idChk, setIdk] = useState('');          //중복체크 아이디

  const [areas, setAreas] = useState([]);       //지역 리스트

  const idRef = useRef();

  //화면이 처음 출력 되었을 때, list에 어떻게 표현 시킬 것인가?


  useEffect(() => {
    startList();
  }, []); // 페이지가 처음으로 불러오는 현상 ( 마운트 ) 이 때만 동작 되게 해달라!


  //랜더링이 더 이상 ( 개발자가 생각한 외에 발생 될 시 )
  // useEffect, useMemo, useCallBack 이 부분을 추가!!!! 없으면 그냥 건들지 마세요.!
  // 위의 기능들은 랜더를 억제하는 것을 목적!!! 많으면 많을수록 사이트가 느려집니다.
  function startList() {
    console.log('=== startList');
    areaList()
      .then(res => {
        setAreas(res.data.data);            // select 지역리스트 추가
        setArea(res.data.data[0].idx);      // 지역코드 기본값 ( 첫 번재 index )
      })
  }

  /**
   * 회원가입 시 동작 되도록!
   */
  function joinAction() {

    //유효성 검사!
    if (아이디.trim().length == 0 || 아이디 !== idChk) {
      alert('아이디 중복 체크부터 해주세요.');
      return;
    }

    //JavaScript 유효성 검사 코드

    //값 담는다.
    const obj = {
      'userId': 아이디,
      'userPw': password,
      'userName': name,
      'email': email,
      'birth': birth,
      'gender': gender,
      'areaIdx': area
    }

    console.log(obj);
    memberRegist(obj)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('err: ', err);
        console.log(`err:  ${err}`);
      })
  }

  return (
    <div className="App">
      {/* 아이디 */}
      <input
        type='text'
        placeholder='아이디 입력'
        ref={idRef}
        value={아이디}
        onChange={e => {
          변경아이디(e.target.value);
        }}
      />
      <input type='button' value='중복 체크' onClick={
        () => {
          let obj = new Object();
          obj.id = 아이디;

          const check = memberIdCheck(obj);

          //성공!
          check.then(res => {
            console.log('===== 성공!!!');
            console.log(res);
            setIdk(아이디);
            idRef.current.disabled = true;
          })

          //실패
          check.catch(err => {
            console.log(err);
          })
        }
      } /><br />


      <input
        type="password"
        placeholder='비밀번호 입력'
        value={password}
        onChange={
          e => setPassword(e.target.value)
        }
      /><br />
      <input
        type="text"
        placeholder='이름 입력해주세요.'
        value={name}
        onChange={e => setName(e.target.value)}
      /><br />
      <input
        type="email"
        placeholder='이메일 입력해주세요.'
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />
      <input
        type="radio"
        name="gender"
        value="M" checked
        onChange={e => {
          setGender(e.target.value)
        }} />남자
      <input
        type="radio"
        name="gender"
        value="F"
        onChange={e => {
          setGender(e.target.value)
        }} />여자<br />
      생년월일 <input
        type="date"
        value={birth}
        onChange={e => { setBirth(e.target.value) }}
      /> <br />


      지역코드
      <select onChange={e => setArea(e.target.value)}>
        {areas.map((item, index) => (
          <option key={index} value={item.idx}>
            {item.areaName}
          </option>
        ))}
      </select>

      {/* submit은 유효성 검사가 힘들다. */}
      <input type="button" value="회원가입" onClick={joinAction} />
    </div>
  );
}

export default Study;